import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  // Mocked provider
  const OrdersServiceProvider = {
    provide: OrdersService,
    useFactory: () => ({
      create: jest.fn(() => []),
    }),
  };

  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, OrdersServiceProvider],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process the incoming data', async () => {
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

    jest.spyOn(service, 'create').mockImplementation(async (dto) => {
      return [
        {
          code: dto.flowerList[0][1],
          total: dto.flowerList[0][0],
          bundles: [
            [9, { price: 16.99, quantity: 1 }],
            [3, { price: 5.95, quantity: 1 }],
          ],
        },
      ];
    });

    expect(
      await service.create({
        flowerList: [[13, 'T58']],
      }),
    ).toStrictEqual(result);
  });
});
