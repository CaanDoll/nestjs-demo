import { Logger } from '@common/logger/logger.service';

export const startLoggerMiddleware = async (req, res, next) => {
  Logger.log(`${req.method} ${req.url}`, 'StartLoggerMiddleware');
  next();
};
