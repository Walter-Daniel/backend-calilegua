import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

@Schema()
export class OrderDetailItem {
  @Prop({ type: Types.ObjectId, ref: Product.name })
  product: Types.ObjectId | Product;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true })
  subtotal: number;
}

const OrderDetailItemSchema = SchemaFactory.createForClass(OrderDetailItem);

@Schema()
export class OrderDetail extends Document {
  @Prop({ type: [OrderDetailItemSchema], required: true })
  items: OrderDetailItem[];

  @Prop({ required: true })
  total: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
