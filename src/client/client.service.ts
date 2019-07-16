import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Response } from 'express';
import * as path from 'path';

@Injectable()
export class ClientService {

  constructor(private readonly configService: ConfigService) {}

  config(res: Response): Promise<any> {
    const config = this.configService.clientConfig;
    if (config) {
      const file: string = path.resolve(`${this.configService.filesConfigPath}`, `${config}`);
      res.sendFile(file);
    } else {
      return Promise.resolve('');
    }
  }
}
