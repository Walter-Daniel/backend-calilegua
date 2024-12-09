import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../../products/entities/product.entity';
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from '../dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterQuery } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // Buscar todos los productos
  async findAll(params?: FilterProductDTO): Promise<Product[]> {
    const filters: FilterQuery<Product> = {};
    const { limit, offset, maxPrice, minPrice } = params;
    if (maxPrice && minPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    const products = await this.productModel
      .find(filters)
      .populate('manufacturer')
      .sort({ price: 1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return products;
  }

  // Buscar producto por id
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Crear producto
  async create(data: CreateProductDTO) {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  // Atualizar producto
  async update(id: string, changes: UpdateProductDTO): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  // Eliminar producto
  async remove(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
