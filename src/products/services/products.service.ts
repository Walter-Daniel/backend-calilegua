import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from '../dtos/product.dto';
import { ManufacturersService } from './manufacturers.service';
import { CategoriesService } from './categories.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // Buscar todos los productos
  async findAll(params?: FilterProductDTO) {
    // if(params){
    //   const where: FindOptionsWhere<Product> = {};
    //   const { limit, offset, maxPrice, minPrice } = params;
    //   if(minPrice && maxPrice) {
    //     where.price = Between(minPrice, maxPrice);
    //   }
    //   return await this.productRepo.find({
    //     relations: ['manufacturer'],
    //     take: limit,
    //     skip: offset
    //   })
    // }
    // return await this.productRepo.find({
    //   relations: ['manufacturer']
    // });
  }

  // Filtro utilizando find y like para busqueda parcial de productos por nombre.
  async findByName(productName: string): Promise<Product[]> {
    return await this.productModel.find({
      where: { name: productName },
    });
  }

  // Buscar producto por id y fabrica
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
    return newProduct.save();
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
