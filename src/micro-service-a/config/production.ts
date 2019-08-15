import { Config } from './index.interface';

const KONG_URL = 'http://kong-proxy:8000';

const config: Config = {
  port: 4000,
  typeorm: {
    type: 'mysql',
    host: '10.10.4.100',
    port: 30991,
    username: 'root',
    password: 'mysql123',
    database: 'order_nest',
    logging: true,
    entities: [ 'src/module/**/*.model.ts' ],
    timezone: '+00:00',
  },
  redis: {
    host: '10.10.4.101',
    port: 31104,
    password: 'kunlun_2019$ABC',
    db: 0,
    keyPrefix: 'koa:sess:',
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
    openapi: 'http://openapi-master:4000',
    uploadUrl: 'http://oss-master:4000',
  },
  elk: {
    client: {
      host: 'http://es-single:9200/_bulk',
    },
  },
};

export default config;
