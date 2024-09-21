import mongoose, { Schema } from 'mongoose';
import { collectionNames } from 'src/constants/collectionNames.js';
import { IRefreshToken } from 'src/types/IRefreshToken.js';

const refreshTokenSchema: Schema<IRefreshToken> =
  new mongoose.Schema<IRefreshToken>({
    userId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.USER,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  });

const RefreshTokenModel = mongoose.model(
  collectionNames.REFRESH_TOKEN,
  refreshTokenSchema,
);

export default RefreshTokenModel;
