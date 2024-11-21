import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  // Un máximo de 100 caracteres por nombre, por si son descriptivos.
  @Prop({ required: true })
  name: string;

  // El tipado text permite descripciones largas
  @Prop()
  description: string;

  // Precisión para decimales en precios. 10 indica los dígitos totales y 2 la cantidad de decimales.

  @Prop({ type: 'Number' })
  price: number;

  // Se asignan enteros para el stock.
  @Prop({ type: 'Number' })
  stock: number;

  // Longitud razonable para nombres de origen (país o ciudad).
  @Prop()
  origin: string;

  // Si la URL es una cadena de texto larga, la mejor opción es text.
  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
