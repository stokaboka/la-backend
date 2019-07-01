import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ClientService {
  constructor(private readonly configService: ConfigService) {}
}
