import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './order-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  providers: [OrderDetailsService],
  controllers: [OrderDetailsController],
})
export class OrderDetailsModule {}
