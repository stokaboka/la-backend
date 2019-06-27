/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      SERVER_PORT: Joi.number().default(4444),
      SERVER_HOST: Joi.string().default('0.0.0.0'),
      TEMPLATE_PATH: Joi.string().default(''),
      TEMPLATE_RESULT_EXCEL_FILE: Joi.string().default(''),
      IMAGES_PATH: Joi.string().default(''),
      // API_AUTH_ENABLED: Joi.boolean().required(),
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

  get port(): number {
    return Number(this.envConfig.SERVER_PORT);
  }

  get host(): string {
    return String(this.envConfig.SERVER_HOST);
  }

  get templatePath(): string {
    return String(this.envConfig.TEMPLATE_PATH);
  }

  get templateResultExcelFile(): string {
    return String(this.envConfig.TEMPLATE_RESULT_EXCEL_FILE);
  }

  get imagesPath(): string {
    return String(this.envConfig.IMAGES_PATH);
  }
}
