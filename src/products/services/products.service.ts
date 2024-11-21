import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  private toPlain(doc: Product): Product {
    return plainToClass(Product, doc.toObject({ getters: true }));
  }

  // Buscar todos los productos
  async findAll(params?: FilterProductDTO) {
    if (params) {
      const { limit, offset } = params;
      return await this.productModel.find().skip(offset).limit(limit).exec();
    }
    return await this.productModel.find().exec();
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
  create(data: CreateProductDTO) {
    console.log({ data });
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
