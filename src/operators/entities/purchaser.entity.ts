import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Operator } from './operator.entity';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Operator, (operator) => operator.purchaser, {
    nullable: true
  })
  operator: Operator;
}