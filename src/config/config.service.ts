/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
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
      API_VERSION: Joi.number().default(1),
      SERVER_PORT: Joi.number().default(4444),
      SERVER_HOST: Joi.string().default('0.0.0.0'),
      PUBLIC_PATH: Joi.string().default(''),
      CLIENT_CONFIG: Joi.string().default(''),
      TEMPLATE_PATH: Joi.string().default(''),
      TEMPLATE_RESULT_EXCEL_FILE: Joi.string().default(''),
      IMAGES_PATH: Joi.string().default(''),

      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().default(3306),
      DB_USER: Joi.string().default('root'),
      DB_PASS: Joi.string().default('123456789'),
      DB_NAME: Joi.string().default('svsla'),

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

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const out: any =  {
      type: 'mysql',
      host: String(this.envConfig.DB_HOST),
      port: Number(this.envConfig.DB_PORT),
      username: String(this.envConfig.DB_USER),
      password: String(this.envConfig.DB_PASS),
      database: String(this.envConfig.DB_NAME),
      entities: ['dist/**/*.entity{.ts,.js}'],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
    // tslint:disable-next-line:no-console
    console.log(out);
    return out;
  }

  get apiVersion(): number {
    return Number(this.envConfig.API_VERSION);
  }

  get port(): number {
    return Number(this.envConfig.SERVER_PORT);
  }

  get host(): string {
    return String(this.envConfig.SERVER_HOST);
  }

  get publicPath(): string {
    // return String(this.envConfig.PUBLIC_PATH);
    return path.join('public');
  }

  get clientConfig(): string {
    return String(this.envConfig.CLIENT_CONFIG);
  }

  get templatePath(): string {
    return String(this.envConfig.TEMPLATE_PATH);
  }

  get templateResultExcelFile(): string {
    return String(this.envConfig.TEMPLATE_RESULT_EXCEL_FILE);
  }

  get imagesPath(): string {
    // return String(this.envConfig.IMAGES_PATH);
    return path.join(this.filesAssetsPath, 'images');
  }

  get filesPath(): string {
    return path.join('files');
  }

  get filesConfigPath(): string {
    return path.join(this.filesPath, 'config');
  }

  get filesAssetsPath(): string {
    return path.join(this.filesPath, 'assets');
  }

  get filesTemplatesPath(): string {
    return path.join(this.filesPath, 'templates');
  }
}
