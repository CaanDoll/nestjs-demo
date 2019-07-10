import { IsEnum, IsNotEmpty, IsOptional, IsString, validate } from 'class-validator';
import * as path from 'path';
const EnvConfig = require(path.join(process.cwd(), 'src/config/index.interface')).default;

enum ENV {
  LOCAL= 'local',
  DEVELOP= 'develop',
  TEST= 'test',
  PRODUCTION= 'production',
}

class EnvVar {
  @IsOptional()
  @IsEnum(ENV)
  NODE_ENV: ENV;

  @IsNotEmpty()
  @IsString()
  npm_package_name: string;

  @IsNotEmpty()
  @IsString()
  npm_package_code: string;

  @IsNotEmpty()
  @IsString()
  npm_package_version: string;

  @IsNotEmpty()
  @IsString()
  npm_package_description: string;
}

async function validateEnvVar() {
  const errors = await validate(Object.assign(new EnvVar(), process.env));
  if (errors.length) {
    setImmediate(() => {
      process.exit(1);
    });
    throw new Error(`EnvVar validation error: ${JSON.stringify(errors)}`);
  }
}

validateEnvVar();

export class ConfigService {
  private readonly envConfig;

  constructor() {
    const env = process.env.NODE_ENV as ENV || ENV.LOCAL;
    const config = require(path.join(process.cwd(), 'src/config', env)).default;
    this.validateEnvConfig(config);
    const { npm_package_name, npm_package_version, npm_package_description } = process.env;
    this.envConfig = {
      ...config,
      env,
      npm_package_name,
      npm_package_version,
      npm_package_description,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }

  private async validateEnvConfig(envConfig): Promise<void> {
    const errors = await validate(Object.assign(new EnvConfig(), envConfig), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length) {
      setImmediate(() => {
        process.exit(1);
      });
      throw new Error(`EnvConfig validation error: ${JSON.stringify(errors)}`);
    }
  }

}
