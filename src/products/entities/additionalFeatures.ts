import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AdditionalFeatures extends Document {
  @Prop({ required: true, unique: true })
  name: string;
}
