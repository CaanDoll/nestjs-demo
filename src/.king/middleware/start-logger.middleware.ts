import { Logger }from '@nestjs/common' ;

export const startLoggerMiddleware = async (req, res, next) => {
  Logger.log(req.url);
  next();
};
