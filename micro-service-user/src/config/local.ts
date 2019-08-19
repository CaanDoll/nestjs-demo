import { IConfig } from './config.interface';

const KONG_URL = 'http://10.8.241.147:8000';

const config: IConfig = {
  port: 4001,
  typeorm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root123456',
    database: 'nestjs_demo_user',
    logging: true,
    entities: [ 'src/module/**/*.model.ts' ],
    timezone: '+08:00',
  },
  redis: {
    host: 'localhost',
    port: 6379,
    db: 0,
    keyPrefix: '',
  },
  integration: {
    product: `${KONG_URL}/product`,
    customer: `${KONG_URL}/customer`,
    finance: `${KONG_URL}/finance`,
    officer: `${KONG_URL}/officer`,
    richman: `${KONG_URL}/richman`,
    mailboy: `${KONG_URL}/mailboy`,
    actions: `${KONG_URL}/actions`,
    knight: `${KONG_URL}/knight`,
    openapi: 'http://10.8.241.147:4012',
    uploadUrl: 'http://10.10.4.101:32720',
  },
};

export default config;
