import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import * as logger from 'node-color-log';

/**
 * Controller for Orders
 */
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Create endpoint for orders.
   * @param createOrderDto CreateOrderDto
   * @returns the calculated pricing data of the order
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createOrderDto: CreateOrderDto) {
    logger.color('yellow').info('recieved request at order -> create');
    return this.ordersService.create(createOrderDto);
  }
}
