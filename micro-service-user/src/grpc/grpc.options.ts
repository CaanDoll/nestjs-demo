import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: join(__dirname, 'grpc.proto'),
  },
};