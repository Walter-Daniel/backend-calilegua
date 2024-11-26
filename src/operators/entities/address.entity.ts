import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';

@Schema()
export class Address extends Document {
  @Transform(({ value }) => value?.toString())
  _id: Types.ObjectId;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true, type: Number })
  number: number;

  @Prop({ required: true })
  city: string;

  @Exclude()
  __v: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
