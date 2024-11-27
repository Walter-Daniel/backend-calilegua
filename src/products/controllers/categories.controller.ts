import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() payload: CreateCategoryDTO) {
    const category = await this.categoriesService.create(payload);
    return {
      ok: true,
      message: 'Category created successfully',
      category,
    };
  }

  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    await this.categoriesService.remove(categoryId);
    return {
      ok: true,
      message: 'Category deleted successfully',
    };
  }
}
