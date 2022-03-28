import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flowers } from './flower.entity';

/**
 * A bundle entity to represent a flower bundle.
 */
@Entity()
export class Bundles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Flowers, (flowers) => flowers.code)
  @JoinColumn({ name: 'flowerCode', referencedColumnName: 'code' })
  flowerCode: Flowers;
}
