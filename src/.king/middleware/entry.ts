import { Logger }from '@nestjs/common' ;

export const startLogger = async (req, res, next) => {
  Logger.log(req.path);
  await next();
  console.log(res.body);
  // Logger.log(res);
};
