import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
    // Pensando en un E-commerce, cada intancia va a generar un id único.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Un máximo de 150 caracteres por nombre, por si son descriptivos.
  @Column({type: 'varchar',length: 150, unique:true})
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];
}