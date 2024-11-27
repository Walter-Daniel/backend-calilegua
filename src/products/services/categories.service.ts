import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';
import { isUUID } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find();
  }

  // Crear categoría
  create(data: CreateCategoryDTO) {
    const newProduct = new this.categoryModel(data);
    return newProduct.save();
  }

  // Eliminar categoría por id
  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
