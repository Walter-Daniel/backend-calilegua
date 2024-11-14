import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Operator } from './operator.entity';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Purchaser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Operator, (operator) => operator.purchaser, {
    nullable: true
  })
  operator: Operator;

  @OneToMany(() => Order, (order) => order.purchaser)
  order: Order[];
}