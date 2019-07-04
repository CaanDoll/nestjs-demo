import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import * as path from 'path';

export interface EnvConfig {
  [key: string]: string;
}

export default class {
  private readonly envConfig: EnvConfig;

  constructor() {
    const { NODE_ENV } = process.env;
    const config = dotenv.parse(fs.readFileSync(path.join(__dirname,`${NODE_ENV}.env`)));
    config.NODE_ENV = NODE_ENV;
    this.envConfig = this.validateInput(config);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['local','develop', 'test', 'production'])
        .default('local'),
      PORT: Joi.number().default(4000),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
