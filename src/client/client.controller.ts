import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Response } from 'express';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(
    private readonly configService: ConfigService,
    private readonly clientService: ClientService,
  ) {}

  @Get('config')
  config(@Res() res: Response): Promise<any> {
    return this.clientService.config(res);
  }
}
