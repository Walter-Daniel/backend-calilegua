export interface OrderModel {
  __v: number;
  _id: string;
  createAt: Date;
  detail: Detail;
  purchaser: Purchaser;
}

export interface Detail {
  __v: number;
  _id: string;
  items: Item[];
  total: number;
}

export interface Item {
  _id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Product {
  __v: number;
  _id: string;
  additionalFeatures: AdditionalFeature[];
  description: string;
  image: string;
  manufacturer: string;
  name: string;
  origin: string;
  price: number;
  stock: number;
}

export interface AdditionalFeature {
  _id: string;
  description: string;
  name: string;
}

export interface Purchaser {
  __v: number;
  _id: string;
  addresses: Address[];
  age: number;
  email: string;
  lastname: string;
  name: string;
  phone: string;
}

export interface Address {
  _id: string;
  city: string;
  number: number;
  street: string;
}

export interface PDFDoct {
  __v: number;
  _id: string;
  createAt: Date;
  detail: Detail;
  purchaser: Purchaser;
}

export interface Detail {
  __v: number;
  _id: string;
  items: Item[];
  total: number;
}

export interface Item {
  _id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Product {
  __v: number;
  _id: string;
  additionalFeatures: AdditionalFeature[];
  description: string;
  image: string;
  manufacturer: string;
  name: string;
  origin: string;
  price: number;
  stock: number;
}

export interface AdditionalFeature {
  _id: string;
  description: string;
  name: string;
}

export interface Purchaser {
  __v: number;
  _id: string;
  addresses: Address[];
  age: number;
  email: string;
  lastname: string;
  name: string;
  phone: string;
}

export interface Address {
  _id: string;
  city: string;
  number: number;
  street: string;
}
