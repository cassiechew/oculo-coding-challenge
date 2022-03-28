import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * A flower entity to represent a flower.
 */
@Entity()
export class Flowers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;
}
