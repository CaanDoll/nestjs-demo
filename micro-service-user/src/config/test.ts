import { IConfig } from './config.interface';
import { Transport } from '@nestjs/microservices';

const config: IConfig = {
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
    keyPrefix: '',
  },
  rabbit: {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://localhost:5672`],
      queue: 'mail',
      queueOptions: { durable: false },
    },
  },
};

export default config;
