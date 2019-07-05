import * as path from 'path';
import { IsEnum, IsInt, IsNotEmpty,validate } from 'class-validator';

enum ENV {
  LOCAL='LOCAL',
  DEVELOP='DEVELOP',
  TEST='TEST',
  PRODUCTION='PRODUCTION',
}

class EnvConfig {
  @IsNotEmpty()
  @IsEnum(ENV)
  env: ENV;

  @IsNotEmpty()
  @IsInt()
  port: number;

  @IsNotEmpty()
  orm: object;

  @IsNotEmpty()
  redis: object;

  @IsNotEmpty()
  ftp: object;
}

export default class ConfigService{
  private readonly envConfig: EnvConfig;

  constructor() {
    const env = process.env.NODE_ENV as ENV || ENV.LOCAL;
    const config = require(path.join(process.cwd(),'src/config',env)).default;
    config.env = env;
    this.envConfig = config;
    this.validateInput(config);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  private async validateInput(envConfig: EnvConfig): Promise<void> {
    const errors = await validate(Object.assign(new EnvConfig(), envConfig));
    if (errors.length) {
      setImmediate(()=>{
        process.exit(1);
      });
      throw new Error(`Config validation error: ${errors}`);
    }
  }
}
