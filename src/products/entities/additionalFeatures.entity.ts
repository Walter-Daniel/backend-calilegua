import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AdditionalFeatures extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const AdditionalFeaturesSchema =
  SchemaFactory.createForClass(AdditionalFeatures);
