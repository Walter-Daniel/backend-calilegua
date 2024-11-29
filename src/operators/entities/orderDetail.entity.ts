// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';
// import { Product } from 'src/products/entities/product.entity';

// @Schema()
// export class OrderDetail extends Document {
//   @Prop({ type: Types.ObjectId, ref: 'Order', required: true }) // Referencia a Order
//   orderId: Types.ObjectId;

//   @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] }) // Múltiples productos
//   productId: Types.Array<Product | Types.ObjectId>;

//   @Prop({ type: Number })
//   quantity: number;

//   @Prop({ type: Number })
//   subTotal: number;
// }

// export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
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
