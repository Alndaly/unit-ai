import winston from 'winston';
import { getAppDataDir } from './get-appdata-dir';
import path from 'path';

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename:
        path.resolve(getAppDataDir(), 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename:
        path.resolve(getAppDataDir(), 'app.log')
    })
  ]
});

export default logger;