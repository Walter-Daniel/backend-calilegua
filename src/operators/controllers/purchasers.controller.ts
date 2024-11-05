import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { PurchasersService } from '../services/purchasers.service';
import { CreatePurchaserDTO, UpdatePurchaserDTO } from '../dtos/purchaser.dto';

@Controller('purchasers')
export class PurchasersController {
    constructor(private purchasersService: PurchasersService) { }

    @Post()
    async createPurchaser(@Body() payload: CreatePurchaserDTO) {
        const purchaser = await this.purchasersService.create(payload)
        return {
            ok: true,
            message: 'Purchaser created successfully',
            purchaser
        };
    }

    @Put(':purchaserId')
    async updatePurchaser(
        @Param('purchaserId') purchaserId: string,
        @Body() body: UpdatePurchaserDTO,
    ) {
        const purchaser = await this.purchasersService.update(purchaserId, body)
        return {
            ok: true,
            message: 'Purchaser updated successfully',
            data: purchaser
        };
    }

    @Delete(':purchaserId')
    async deletePurchaser(@Param('purchaserId') purchaserId: string) {
        const purchasers = await this.purchasersService.remove(purchaserId);
        return {
            ok: true,
            message: 'Purchaser deleted successfully',
            purchaserId,
            delete: true,
            purchasers,
        };
    }

    @Get()
    async getAllPurchasers() {
        const purchasers = await this.purchasersService.findAll();
        return {
            ok: true,
            message: 'All purchasers retrieved successfully',
            purchasers,
        };
    }

    @Get(':purchaserId')
    async getPurchaserById(@Param('purchaserId') purchaserId: string) {
        const purchaser = await this.purchasersService.findOne(purchaserId);
        return {
            ok: true,
            message: `Purchaser with ID ${purchaserId} retrieved successfully`,
            purchaser,
        };
    }
}
