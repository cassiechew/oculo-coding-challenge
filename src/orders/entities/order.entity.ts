/**
 * A representation of an order entity for use in the dto.
 */
export class Order {
  flowerList: [[number, string]];

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
