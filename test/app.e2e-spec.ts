import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Du kan ikke vær har!');
  });

  it('/orders (POST)', () => {
    const result = [
      {
        code: 'R12',
        total: 10,
        bundles: [[10, { price: 12.99, quantity: 1 }]],
      },
      {
        code: 'L09',
        total: 15,
        bundles: [
          [9, { price: 24.95, quantity: 1 }],
          [6, { price: 16.95, quantity: 1 }],
        ],
      },
      {
        code: 'T58',
        total: 13,
        bundles: [
          [9, { price: 16.99, quantity: 1 }],
          [3, { price: 5.95, quantity: 1 }],
        ],
      },
    ];

    return request(app.getHttpServer())
      .post('/orders')
      .send({
        flowerList: [
          [10, 'R12'],
          [15, 'L09'],
          [13, 'T58'],
        ],
      })
      .expect(201)
      .expect(result);
  });

  it('empty flowerlist', async () => {
    const result = {
      statusCode: 400,
      message: 'Bad Request!',
    };

    return request(app.getHttpServer())
      .post('/orders')
      .send({
        flowerList: [],
      })
      .expect(400)
      .expect(result);
  });

  it('empty request', async () => {
    const result = {
      statusCode: 400,
      message: ['flowerList should not be empty'],
      error: 'Bad Request',
    };

    return request(app.getHttpServer())
      .post('/orders')
      .send({})
      .expect(400)
      .expect(result);
  });
});
