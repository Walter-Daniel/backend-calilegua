import { Injectable, NotFoundException } from '@nestjs/common';
import { Purchaser } from '../entities/purchaser.entity';

@Injectable()
export class PurchasersService {
    private purchasers: Purchaser[] = [
        {
            id: 1,
            name: 'Lautaro',
            lastname: 'Ocampo',
            phone: '+54333111222'
        },
        {
            id: 2,
            name: 'María',
            lastname: 'Lopez',
            phone: '+54333111222'
        }
    ]
    findAll() {
        return this.purchasers;
    }
    totalPurchasers() {
        return this.purchasers.length;
    }
    findOne(id: number) {
        const purchaser = this.purchasers.find((purchaser) => purchaser.id === id);
        if (!purchaser) {
            throw new NotFoundException(`Purchaser with ID ${id} not found`);
        }
        return purchaser;
    }
    remove(id: number) {
        const purchaser = this.purchasers.filter((purchaser) => purchaser.id !== id);
        if (!purchaser) {
            throw new NotFoundException(`Purchaser with ID ${id} not found`);
        }
        return purchaser;
    }
}
