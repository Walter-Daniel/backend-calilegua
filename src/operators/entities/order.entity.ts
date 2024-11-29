import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Purchaser } from './purchaser.entity';
import { OrderDetail } from './orderDetail.entity';

@Schema()
export class Order extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: Purchaser.name,
    required: true,
  })
  purchaser: Purchaser | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: OrderDetail.name, required: true })
  detail: OrderDetail | Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
