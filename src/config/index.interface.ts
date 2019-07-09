import { IsInt, IsNotEmpty } from 'class-validator';

export default class {
  @IsNotEmpty()
  @IsInt()
  port: number;

  @IsNotEmpty()
  typeorm: object;

  @IsNotEmpty()
  redis: object;
}
