import { Config } from '../../micro-service-a/config/index.interface';
import { IsEnum, IsNotEmpty, IsOptional, IsString, validate } from 'class-validator';
import * as path from 'path';

export enum ENODE_ENV {
  local= 'local',
  develop= 'develop',
  test= 'test',
  production= 'production',
}

class EnvVar {
  @IsOptional()
  @IsEnum(ENODE_ENV)
  NODE_ENV: ENODE_ENV;

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

// 校验环境变量
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

interface IAllConfig extends EnvVar, Config {}
let instance;
export class ConfigService {
  private readonly config: IAllConfig;

  constructor() {
    const { npm_package_name, npm_package_version, npm_package_description, NODE_ENV } = process.env;
    const env = NODE_ENV as ENODE_ENV || ENODE_ENV.local;
    const config = require(path.join(process.cwd(), 'src/config', env)).default;
    this.validateConfig(config);
    this.config = {
      ...config,
      NODE_ENV: env,
      npm_package_name,
      npm_package_version,
      npm_package_description,
    };
  }

  static getInstance() {
    if (!instance) {
      instance = new ConfigService();
    }
    return instance;
  }

  get(key: keyof IAllConfig): any {
    return this.config[key];
  }

  // 校验config
  private async validateConfig(config): Promise<void> {
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
