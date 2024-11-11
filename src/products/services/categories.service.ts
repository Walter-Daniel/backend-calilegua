import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  totalCategories() {
    return this.categoryRepo.count();
  }

  async findOne(id: string) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  // Crear categoría
  create(data: CreateCategoryDTO) {
    const newProduct = this.categoryRepo.create(data);
    return this.categoryRepo.save(newProduct);
  }

  // Atualizar categoría por id
  async update(id: string, changes: UpdateCategoryDTO): Promise<Category> {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  // Eliminar categoría por id
  async remove(id: string): Promise<void> {
    const deleteResult = await this.categoryRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
