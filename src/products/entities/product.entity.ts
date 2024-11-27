import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Manufacturer } from './manufacturer.entity';
import {
  AdditionalFeatures,
  AdditionalFeaturesSchema,
} from './additionalFeatures.entity';
import { Category } from './category.entity';

@Schema({})
export class Product extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: 'Number', index: true })
  price: number;

  @Prop({ type: 'Number' })
  stock: number;

  @Prop()
  origin: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  categoria: Category | Types.ObjectId;

  @Prop({ type: [AdditionalFeaturesSchema] })
  additionalFeatures: Types.Array<AdditionalFeatures>;

  @Prop({ type: Types.ObjectId, ref: Manufacturer.name })
  manufacturer: Manufacturer | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1 }); //Ordena por precio ascendente
