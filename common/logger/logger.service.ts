import { LoggerService } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as path from 'path';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { ConfigService, ENODE_ENV } from '../config/config.service';
const configService = ConfigService.getInstance();

const { combine, timestamp, printf } = format;

const isProduction = configService.get('NODE_ENV') === ENODE_ENV.production;

const logger = createLogger({
  // 日志格式化为"2001-01-01 00:00:00 [3612] [INFO] [NestApplication] Nest application successfully started"
  format: combine(
    timestamp(),
    printf(
      info => {
        const { timestamp, level, message, ...meta } = info;
        // @ts-ignore
        const SPLAT = meta[Symbol.for('splat')];
        // @ts-ignore
        const context = SPLAT && SPLAT.length ? SPLAT[0] : 'Undefined';
        return `${ dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss') } [${process.pid}] [${ level.toUpperCase() }] [${context}] ${message}`;
      },
    ),
  ),
  transports: [
    new transports.Console({
      level: isProduction ? 'info' : 'debug',
      handleExceptions: true,
    }),
  ],
});

if (isProduction) {
  logger.add(new DailyRotateFile({
    level: 'info',
    filename: path.join(process.cwd(), 'log', '%DATE%.log'),
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    json: false,
  }));
}

export class Logger implements LoggerService {
  debug(message: any, context: string) {
    logger.debug(message, context);
  }

  log(message: any, context: string) {
    logger.info(message, context);
  }

  info(message: any, context: string) {
    logger.info(message, context);
  }

  warn(message: any, context: string) {
    logger.warn(message, context);
  }

  error(message: any, context: string) {
    logger.error(message, context);
  }

  static debug(message: any, context: string) {
    logger.debug(message, context);
  }

  static log(message: any, context: string) {
    logger.info(message, context);
  }

  static info(message: any, context: string) {
    logger.info(message, context);
  }

  static warn(message: any, context: string) {
    logger.warn(message, context);
  }

  static error(message: any, context: string) {
    logger.error(message, context);
  }

}
