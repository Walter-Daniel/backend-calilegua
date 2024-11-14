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
import { Exclude } from 'class-transformer';

// Asignamos los tipos de roles a los operadores
export enum OperatorRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

@Entity()
export class Operator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: OperatorRole,
    default: OperatorRole.STAFF
  })
  role: OperatorRole;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 100, nullable: true })
  lastname: string;

  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  
  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Purchaser, (purchaser) => purchaser.operator, {
    nullable: true,
  })
  @JoinColumn({
    name: 'purchaser_id'
  })
  purchaser: Purchaser;
}
