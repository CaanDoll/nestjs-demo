import { Config } from '@config/index.interface';
import { IsEnum, IsNotEmpty, IsOptional, IsString, validate } from 'class-validator';
import * as path from 'path';

enum ENV {
  local= 'local',
  develop= 'develop',
  test= 'test',
  production= 'production',
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
  private readonly config: Config;

  constructor() {
    const env = process.env.NODE_ENV as ENV || ENV.local;
    const config = require(path.join(process.cwd(), 'src/config', env)).default;
    this.validateEnvConfig(config);
    const { npm_package_name, npm_package_version, npm_package_description } = process.env;
    this.config = {
      ...config,
      env,
      npm_package_name,
      npm_package_version,
      npm_package_description,
    };
  }

  get(key: keyof Config): any {
    return this.config[key];
  }

  private async validateEnvConfig(config): Promise<void> {
    const errors = await validate(Object.assign(new Config(), config), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length) {
      setImmediate(() => {
        process.exit(1);
      });
      throw new Error(`Config validation error: ${JSON.stringify(errors)}`);
    }
  }

}
