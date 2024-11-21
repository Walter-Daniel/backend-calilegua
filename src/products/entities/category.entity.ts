import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Category {
  // Pensando en un E-commerce, cada intancia va a generar un id único.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Un máximo de 150 caracteres por nombre, por si son descriptivos.
  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
