import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Address, AddressSchema } from './address.entity';

@Schema()
export class Purchaser {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  lastname: string;

  @Prop({ type: 'Number', min: 18 })
  age: number;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({
    type: [AddressSchema],
  })
  addresses: Types.Array<Address>;

  @Exclude()
  __v: number;
}

export type PurchaserDocument = Purchaser & Document;
export const PurchaserSchema = SchemaFactory.createForClass(Purchaser);
