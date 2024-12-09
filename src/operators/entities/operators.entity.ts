import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum OperatorRole {
  PURCHASER = 'purchaser',
  ADMIN = 'admin',
}

@Schema()
export class Operator extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop({ type: String, enum: OperatorRole, default: OperatorRole.PURCHASER })
  role: OperatorRole;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
