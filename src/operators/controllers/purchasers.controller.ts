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
    createPurchaser(@Body() payload: CreatePurchaserDTO) {
        return {
            ok: true,
            message: 'Purchaser created successfully',
            payload,
        };
    }

    @Put(':purchaserId')
    updatePurchaser(
        @Param('purchaserId') purchaserId: string,
        @Body() body: UpdatePurchaserDTO,
    ) {
        return {
            ok: true,
            message: 'Purchaser updated successfully',
            data: body,
        };
    }

    @Delete(':purchaserId')
    deletePurchaser(@Param('purchaserId', ParseIntPipe) purchaserId: number) {
        const purchasers = this.purchasersService.remove(purchaserId);
        return {
            ok: true,
            message: 'Purchaser deleted successfully',
            purchaserId,
            delete: true,
            purchasers,
            count: purchasers.length,
        };
    }

    @Get()
    getAllPurchasers() {
        const purchasers = this.purchasersService.findAll();
        return {
            ok: true,
            message: 'All purchasers retrieved successfully',
            purchasers,
        };
    }

    @Get(':purchaserId')
    getPurchaserById(@Param('purchaserId', ParseIntPipe) purchaserId: number) {
        const purchaser = this.purchasersService.findOne(purchaserId);
        return {
            ok: true,
            message: `Purchaser with ID ${purchaserId} retrieved successfully`,
            purchaser,
        };
    }
}
