import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'products',
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
})
export class Product extends Document {
  // Un máximo de 100 caracteres por nombre, por si son descriptivos.
  @Prop({ required: true, unique: true })
  name: string;

  // El tipado text permite descripciones largas
  @Prop()
  description: string;

  // Precisión para decimales en precios. 10 indica los dígitos totales y 2 la cantidad de decimales.
  @Prop({ type: 'Number', index: true })
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

  @Prop(
    raw({
      name: { type: String },
    }),
  )
  additonalFeatures: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1 }); //Se oridena por precio ascendente
