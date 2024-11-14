import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, Check } from 'typeorm';
import { Operator } from './operator.entity';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';
import { Min } from 'class-validator';

@Entity()
@Check(`"age" >= 18`)
export class Purchaser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ type: 'int' })
  @Min(18, { message: 'Purchaser must be at least 18 years old' })
  age: number;

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