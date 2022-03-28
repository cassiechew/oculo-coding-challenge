import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Bundles } from './entities/bundle.entity';
import { Flowers } from './entities/flower.entity';
import * as logger from 'node-color-log';
import { combinationSum } from 'src/utils/sum';

// quantity => number of bundles, price
type flowerBundleQuantity = Map<number, [number, number]>;
type flowerCodeTotal = [number, string];

/**
 * Orders service containing all business logic of orders endponts.
 */
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Bundles)
    @InjectRepository(Flowers)
    private bundleRepository: Repository<Bundles>,
  ) {}

  /**
   * Create endpoint to process quantities of flower orders.
   * @param createOrderDto DTO of a create order
   * @returns Object with flower pricing data
   */
  async create(createOrderDto: CreateOrderDto) {
    if (createOrderDto.flowerList.length === 0) {
      logger
        .bgColor('red')
        .error('Recieved an empty flowerlist! -> flowerlist: []');
      throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST);
    }

    logger
      .color('yellow')
      .info('Processing request! -> ', createOrderDto.flowerList);

    // Initial processing of Bundles in orders.
    const orderFlowerBundles: [flowerCodeTotal, flowerBundleQuantity][] = [];
    for (const o of createOrderDto.flowerList) {
      let bundles = await this.bundleRepository.findBy({
        flowerCode: {
          code: o[1],
        },
      });
      bundles = bundles.sort((a, b) => b.quantity - a.quantity);

      // A map of what kind of bundles and how many of those bundles.
      const bundleMap: flowerBundleQuantity = new Map();

      // Builder for algorithm
      const bundleQuantities = [];
      for (const b of bundles) {
        bundleQuantities.push(b.quantity);
      }

      // Combinations algorithm
      let combinations = combinationSum(bundleQuantities, o[0]);
      combinations = combinations.sort((a, b) => a.length - b.length);
      console.log(combinations);

      // Looping through smallest bundle array and generating order
      for (const n of combinations[0]) {
        for (const b of bundles) {
          if (b.quantity !== n) continue;
          if (!bundleMap.has(b.quantity)) {
            bundleMap.set(b.quantity, [1, b.price]);
          } else {
            const currentPricePair = bundleMap.get(b.quantity);
            currentPricePair[0] += 1;
            currentPricePair[1] += b.price;
            bundleMap.set(b.quantity, currentPricePair);
          }
        }
      }
      orderFlowerBundles.push([o, bundleMap]);
    }

    // Building return request.
    const out = [];
    for (const flowers of orderFlowerBundles) {
      // An array with form [bundleSize, [price, quantity]]
      const bundleListing = [];
      let bundleTotalPrice = 0;

      // Looping through the number of bundles for this flower and how much they are
      for (const bundle of flowers[1]) {
        bundleTotalPrice += bundle[1][1];
        bundleListing.push([
          bundle[0],
          {
            price: bundle[1][1],
            quantity: bundle[1][0],
          },
        ]);
      }
      out.push({
        code: flowers[0][1],
        totalPrice: bundleTotalPrice.toFixed(2),
        total: flowers[0][0],
        bundles: bundleListing,
      });
    }

    logger
      .color('yellow')
      .info('Processing completed! -> ', createOrderDto.flowerList);
    return out;
  }
}
