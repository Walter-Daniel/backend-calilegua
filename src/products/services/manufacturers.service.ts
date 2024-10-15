import { Injectable, NotFoundException } from '@nestjs/common';
import { Manufacturer } from '../entities/manufacturer.entity';

@Injectable()
export class ManufacturersService {
    private manufacurers: Manufacturer[] = [
        {
            id: 1,
            name: 'Example 1',
            address: 'Pasaje Ocampo 333',
            email: 'example1@email.com',
            image: 'http://example1.com'
        },
        {
            id: 2,
            name: 'Example 2',
            address: 'Av. Avellanedad 333',
            email: 'example2@email.com',
            image: 'http://example2.com'
        }
    ]
    findAll() {
        return this.manufacurers;
    }
    totalManufacturers() {
        return this.manufacurers.length;
    }
    findOne(id: number) {
        const manufacturer = this.manufacurers.find((manufacturer) => manufacturer.id === id);
        if (!manufacturer) {
            throw new NotFoundException(`Manufacturer with ID ${id} not found`);
        }
        return manufacturer;
    }
    remove(id: number) {
        const manufacturer = this.manufacurers.filter((manufacturer) => manufacturer.id !== id);
        if (!manufacturer) {
            throw new NotFoundException(`Manufacturer with ID ${id} not found`);
        }
        return manufacturer;
    }
}
