import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const userGrpc: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:4000',
    package: 'user',
    protoPath: join(__dirname, './user.proto'),
  },
};