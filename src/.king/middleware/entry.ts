import { Logger }from '@nestjs/common' ;

// TODO log4js elk
// TODO passport session redis
// TODO axios
// TODO sentry

export const startLogger = async (req, res, next) => {
  Logger.log(req.url);
  next();
};
