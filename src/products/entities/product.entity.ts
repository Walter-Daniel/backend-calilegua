import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export class Product {
  // Pensando en un E-commerce, cada intancia va a generar un id único.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Un máximo de 100 caracteres por nombre, por si son descriptivos.
  @Column({length: 100})
  name: string;

  // El tipado text permite descripciones largas
  @Column({ type: 'text' }) 
  description: string;

  // Precisión para decimales en precios. 10 indica los dígitos totales y 2 la cantidad de decimales.
  @Column('decimal', { precision: 10, scale: 2 }) 
  price: number;

  // Se asignan enteros para el stock.
  @Column('int')
  stock: number;

  // Longitud razonable para nombres de origen (país o ciudad).
  @Column({ length: 100 }) 
  origin: string;

  // Si la URL es una cadena de texto larga, la mejor opción es text.
  @Column({ type: 'text' }) 
  image: string;
}
