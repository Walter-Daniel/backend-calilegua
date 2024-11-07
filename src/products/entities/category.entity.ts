import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
    // Pensando en un E-commerce, cada intancia va a generar un id único.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Un máximo de 100 caracteres por nombre, por si son descriptivos.
  @Column({length: 100})
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}