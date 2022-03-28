import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * A bundle entity to represent a flower entity.
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
