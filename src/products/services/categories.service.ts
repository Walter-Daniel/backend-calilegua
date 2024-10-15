import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
    private categories: Category[] = [
        {
            id: 1,
            name: 'Example 1'
        },
        {
            id: 2,
            name: 'Example 2'
        },
        {
            id: 3,
            name: 'Example 3'
        },
        {
            id: 4,
            name: 'Example 4'
        }
    ]
    findAll() {
        return this.categories;
    }
    totalProducts() {
        return this.categories.length;
    }
    findOne(id: number) {
        const category = this.categories.find((category) => category.id === id);
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    remove(id: number) {
        const category = this.categories.filter((category) => category.id !== id);
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
}
