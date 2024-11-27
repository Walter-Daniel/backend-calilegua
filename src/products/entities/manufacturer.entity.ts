import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Manufacturer extends Document {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  image: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
