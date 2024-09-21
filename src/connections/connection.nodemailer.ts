import nodemailer from 'nodemailer';
import { mailConfig } from '../configs/config.nodemailer.js';

export const transporter = nodemailer.createTransport(mailConfig);
