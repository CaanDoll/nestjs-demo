/*
import { LoggerService } from '@nestjs/common';
import * as moment from 'moment';
import * as path from 'path';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

const logger = createLogger({
  // 日志格式化 格式为 "2001-01-01 00:00:00 [INFO] 3612 任务执行完成"
  format: combine(
    timestamp(),
    printf(
      info => {
        return `${ moment().format('YYYY-MM-DD HH:mm:ss') } [${ info.level.toUpperCase() }] ${process.pid} ${ info.message }`;
      },
    ),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
    // 日志切割 按天切割
    new DailyRotateFile({
      level: 'info',
      filename: path.join(process.env.LOG_PATH || './', '%DATE%.log'),
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      json: false,
    }),
  ],
});

export class LogService implements LoggerService {
  log(message: string) {
    logger.info(message);
  }

  warn(message: string) {
    logger.warn(message);
  }

  error(message: string) {
    logger.error(message);
  }

  debug(message: string) {
    logger.debug(message);
  }

  static log(message: string) {
    logger.info(message);
  }

  static warn(message: string) {
    logger.warn(message);
  }

  static error(message: string) {
    logger.error(message);
  }

  static debug(message: string) {
    logger.debug(message);
  }
}
*/
