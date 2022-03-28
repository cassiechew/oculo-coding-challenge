import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    // Mocked provider
    const OrdersServiceProvider = {
      provide: OrdersService,
      useFactory: () => ({
        create: jest.fn().mockImplementation((dto: CreateOrderDto) => [
          {
            code: dto.flowerList[0][1],
            total: dto.flowerList[0][0],
            bundles: [
              [9, { price: 16.99, quantity: 1 }],
              [3, { price: 5.95, quantity: 1 }],
            ],
          },
        ]),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, OrdersServiceProvider],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('returns a successful result', async () => {
      const result = [
        {
          code: 'T58',
          total: 13,
          bundles: [
            [9, { price: 16.99, quantity: 1 }],
            [3, { price: 5.95, quantity: 1 }],
          ],
        },
      ];

      expect(
        await controller.create({
          flowerList: [[13, 'T58']],
        }),
      ).toStrictEqual(result);
    });
  });
});
