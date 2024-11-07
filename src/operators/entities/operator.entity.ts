import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Purchaser } from './purchaser.entity';

@Entity()
export class Operator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 50 })
  role: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 100, nullable: true })
  lastname: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Purchaser, (purchaser) => purchaser.operator, {
    nullable: true,
  })
  @JoinColumn({
    name: 'purchaserId'
  })
  purchaser: Purchaser;

  //almacena en tabla operator la referencia a purchaser a traves de purchaserId
  @Column({name: 'purchaserId', nullable: true})
  purchaserId: string
}
