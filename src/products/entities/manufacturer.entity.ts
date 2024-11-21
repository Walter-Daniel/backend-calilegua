import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Manufacturer {
  // Pensando en un E-commerce, cada intancia va a generar un id único.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Un máximo de 100 caracteres por nombre, por si son descriptivos.
  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 150 })
  email: string;

  // Si la URL es una cadena de texto larga, la mejor opción es text.
  @Column({ type: 'text' })
  image: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
