//load from ~/.zshrc or .env file
import * as dotenv from 'dotenv';
dotenv.config();

export const AWS_ACCOUNT = process.env.AWS_ACCOUNT;
export const AWS_REGION = process.env.AWS_REGION;
export const TABLE_NAME = process.env.TABLE_NAME;