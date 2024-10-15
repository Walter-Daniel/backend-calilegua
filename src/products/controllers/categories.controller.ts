import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Post()
    createCategory(@Body() payload: CreateCategoryDTO) {
        return {
            ok: true,
            message: 'Category created successfully',
            payload,
        };
    }

    @Put(':categoryId')
    updateCategory(
        @Param('categoryId') categoryId: string,
        @Body() body: UpdateCategoryDTO,
    ): any {
        return {
            ok: true,
            message: 'Category updated successfully',
            data: body,
        };
    }

    @Delete(':categoryId')
    deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number): any {
        const categories = this.categoriesService.remove(categoryId);
        return {
            ok: true,
            message: 'Category deleted successfully',
            categoryId,
            delete: true,
            categories,
            count: categories.length,
        };
    }

    @Get()
    getAllCategories() {
        const categories = this.categoriesService.findAll();
        return {
            ok: true,
            message: 'All categories retrieved successfully',
            categories,
        };
    }

    @Get(':categoryId')
    getCategoryById(@Param('categoryId', ParseIntPipe) categoryId: number) {
        const category = this.categoriesService.findOne(categoryId);
        return {
            ok: true,
            message: `Category with ID ${categoryId} retrieved successfully`,
            category,
        };
    }

    @Get('filter')
    getCategoryByFilter(@Query('name') name: string) {
        const filterCriteria: any = {};
        if (name) filterCriteria.name = name;

        return {
            ok: true,
            message: `Categories filtered by criteria: ${JSON.stringify(filterCriteria)}`,
            categories: [{ id: 1, name: name || 'Category A' }],
        };
    }
}
