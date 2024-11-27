import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address extends Document {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true, type: Number })
  number: number;

  @Prop({ required: true })
  city: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
