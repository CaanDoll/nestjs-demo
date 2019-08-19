import { IConfig } from './config.interface';
import { Transport } from '@nestjs/microservices';

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
