// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env' });
import { TConfiguration } from './configuration.interface';
import * as path from 'path';

export const configuration = (): TConfiguration => ({
  serverPort: process.env.SERVER_PORT || '5000',
  uploadDir: process.env.UPLOAD_DIR || path.resolve('upload'),
  mongoUrl: JSON.parse(process.env.MONGO_URL),
  mongoConnectionNameDefault: process.env.MONGO_CONNECTION_NAME_DEFAULT,
});
