import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { Purchaser } from './purchaser.entity';

@Schema()
export class Order extends Document {
  // @Transform(({ value }) => value.toString())
  // _id: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Purchaser.name, required: true }],
  })
  purchaser: Purchaser | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;

  @Prop({ type: Date })
  date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
