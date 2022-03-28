import { IsNotEmpty } from 'class-validator';

/**
 * Mapping of a create order dto.
 */
export class CreateOrderDto {
  @IsNotEmpty()
  flowerList: [number, string][];
}
