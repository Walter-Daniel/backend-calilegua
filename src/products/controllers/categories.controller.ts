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
    async createCategory(@Body() payload: CreateCategoryDTO) {
        const category = await this.categoriesService.create(payload);
        return {
            ok: true,
            message: 'Category created successfully',
            category
        };
    }

    @Put(':categoryId')
    async updateCategory(
        @Param('categoryId') categoryId: string,
        @Body() body: UpdateCategoryDTO,
    ){
        const category = await this.categoriesService.update(categoryId, body);
        return {
            ok: true,
            message: 'Category updated successfully',
            category
        };
    }

    @Delete(':categoryId')
    async deleteCategory(@Param('categoryId') categoryId: string){
        await this.categoriesService.remove(categoryId);
        return {
            ok: true,
            message: 'Category deleted successfully',           
        };
    }

    @Get()
    async getCategories(@Query('ids') ids?: string) {
        if (ids) {
            const categoryIds = ids.split(',');
            const categories = await this.categoriesService.findMultipleCategoriesByIds(categoryIds);
            return {
                ok: true,
                message: 'Multiple categories retrieved successfully',
                categories,
            };
        } else {
            const categories = await this.categoriesService.findAll();
            return {
                ok: true,
                message: 'All categories retrieved successfully',
                categories,
            };
        }
    }

    @Get(':categoryId')
    getCategoryById(@Param('categoryId', ParseIntPipe) categoryId: string) {
        const category = this.categoriesService.findOne(categoryId);
        return {
            ok: true,
            message: `Category with ID ${categoryId} retrieved successfully`,
            category,
        };
    }

   


}
