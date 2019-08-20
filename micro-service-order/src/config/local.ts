import { IConfig } from './config.interface';

const config: IConfig = {
  port: 4000,
  typeorm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root123456',
    database: 'nestjs_demo_order',
    logging: true,
    synchronize: false,
    entities: [ 'src/module/**/*.model.ts' ],
    timezone: '+08:00',
  },
  redis: {
    host: 'localhost',
    port: 6379,
    db: 0,
    keyPrefix: '',
  },
};

export default config;
