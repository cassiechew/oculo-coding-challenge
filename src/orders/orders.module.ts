import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Bundles } from './entities/bundle.entity';
import { Flowers } from './entities/flower.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flowers]),
    TypeOrmModule.forFeature([Bundles]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
