import { Min } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

@Schema()
export class Purchaser {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  lastname: string;

  @Prop({ type: 'Number' })
  @Min(18, { message: 'Purchaser must be at least 18 years old' })
  age: number;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({
    type: [
      {
        street: { type: String },
        number: { type: String },
        city: { type: String },
      },
    ],
  })
  addresses: Types.Array<Record<string, any>>;

  @Exclude()
  __v: number;
}

export type PurchaserDocument = Purchaser & Document;
export const PurchaserSchema = SchemaFactory.createForClass(Purchaser);
