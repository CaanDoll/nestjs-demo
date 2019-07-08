import { IsInt, IsNotEmpty } from 'class-validator';

export default class {
  @IsNotEmpty()
  @IsInt()
  port: number;

  @IsNotEmpty()
  orm: object;

  @IsNotEmpty()
  redis: object;
}
