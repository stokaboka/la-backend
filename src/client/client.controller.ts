import { Controller, Get, Res } from '@nestjs/common';
// import { ClientService } from './client.service';
import { ConfigService } from '../config/config.service';

@Controller('client')
export class ClientController {
  constructor(private readonly configService: ConfigService) {}

  @Get('config')
  config(@Res() res): Promise<any> {
    const config = this.configService.clientConfig;
    if (config) {
      return res.sendfile(config, { root: 'public' });
    } else {
      return Promise.resolve('');
    }
  }
}
