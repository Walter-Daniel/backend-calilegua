import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';
import { isUUID } from 'class-validator';

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

  //Buscar categoría id
  async findOne(id: string) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  // Buscar categorías utilizando multiples IDs.
  //Utilizando el operador In, podemos realizar consultas y encontras categorias a través del array de ids proporcionado
  async findMultipleCategoriesByIds(ids: string[]): Promise<Category[]> {

    //Validar el uuid antes de que se realice la consulta
    const invalidIds = ids.filter(id => !isUUID(id));
    if (invalidIds.length > 0) {
      throw new BadRequestException(`Invalid UUID format for IDs: ${invalidIds.join(', ')}`);
    }

    const categories = await this.categoryRepo.find({
      where: { id: In(ids) },
    });
   
    if (categories.length !== ids.length) {
      const foundIds = categories.map(category => category.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`Categories with IDs ${missingIds.join(', ')} not found`);
    }

    return categories;
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
