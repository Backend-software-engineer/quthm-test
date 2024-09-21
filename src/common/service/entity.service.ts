import { Document, FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import TaskModel from '../../models/taskModel.js';
import UserModel from '../../models/userModel.js';

interface IEntityService<T extends Document> {
  createRecord(data: Partial<T>, populationOptions: any): Promise<T>;
  getRecords(
    filter?: FilterQuery<T>,
    limit?: number,
    skip?: number,
    project?: string,
    populationOptions?: any,
  ): Promise<T[]>;
  getRecord(filter?: FilterQuery<T>, select?: string): Promise<T | null>;
  getRecordsArray(filter?: FilterQuery<T>, select?: string): Promise<T[]>;
  updateRecord(id: string, updateData: UpdateQuery<T>): Promise<T | null>;
  deleteRecord(id: string): Promise<T | null>;
  getRecordById(id: string, select?: string): Promise<T | null>;
  getTotalCount(filter: FilterQuery<T>): Promise<number>;
}

class EntityService<T extends Document> implements IEntityService<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async createRecord(
    data: Partial<T>,
    populationOptions: any = '',
  ): Promise<T | any> {
    try {
      let newRecord = await this.model.create(data);
      newRecord = await this.model.populate(newRecord, populationOptions);
      return newRecord;
    } catch (error) {
      throw error;
    }
  }

  async getRecords(
    filter: FilterQuery<T> = {},
    page: number = 1,
    limit: number = 10,
    project: any = '',
    populationOptions: any = '',
  ): Promise<T[]> {
    try {
      const skip = (page - 1) * limit;
      const records: T[] = await this.model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(project)
        .populate(populationOptions);
      return records;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTotalCount(filter: FilterQuery<T> = {}): Promise<number> {
    try {
      const records: number = await this.model.countDocuments(filter);
      return records;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRecord(
    filter: FilterQuery<T> = {},
    select: string = '',
  ): Promise<T | null> {
    try {
      const record: T | null = await this.model.findOne(filter).select(select);
      return record;
    } catch (error) {
      throw error;
    }
  }

  async getRecordsArray(
    filter: FilterQuery<T> = {},
    select: string = '',
  ): Promise<T[]> {
    try {
      console.log('Get record Array Filter', filter);
      const records: T[] = await this.model.find(filter).select(select);

      return records;
    } catch (error) {
      throw error;
    }
  }

  async getRecordById(
    id: string | Types.ObjectId,
    select: string = '',
    populationOptions: any = '',
  ): Promise<T | null | any> {
    try {
      const record: T | null | any = await this.model
        .findById(id)
        .select(select)
        .populate(populationOptions);
      return record;
    } catch (error) {
      throw error;
    }
  }

  async updateRecord(
    id: string,
    updateData: UpdateQuery<T>,
    populationOptions: any = '',
  ): Promise<T | null | any> {
    try {
      const result: T | null | any = await this.model
        .findByIdAndUpdate(id, updateData, { new: true })
        .populate(populationOptions);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async customUpdate(
    filter: FilterQuery<T> = {},
    updateData: UpdateQuery<T>,
    options: { new?: boolean; upsert?: boolean } = { new: true },
    populationOptions: any = '',
  ): Promise<T | any> {
    try {
      // Assume you have a Mongoose model named `YourModel`
      const result = await this.model
        .findOneAndUpdate(filter, updateData, options)
        .populate(populationOptions);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteRecord(id: string): Promise<T | null> {
    try {
      const result: T | null = await this.model.findByIdAndDelete(id).exec();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

const UserDbService = new EntityService<any>(UserModel);
const TaskDbService = new EntityService<any>(TaskModel);

export { EntityService, IEntityService, UserDbService, TaskDbService };
