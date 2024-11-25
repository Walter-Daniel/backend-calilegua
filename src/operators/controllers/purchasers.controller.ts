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
import { PurchasersService } from '../services/purchasers.service';
import {
  CreatePurchaserDTO,
  FilterPurchaserDTO,
  UpdatePurchaserDTO,
} from '../dtos/purchaser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Purchasers')
@Controller('purchasers')
export class PurchasersController {
  constructor(private purchasersService: PurchasersService) {}

  @Post()
  async createPurchaser(@Body() createPurchaserDto: CreatePurchaserDTO) {
    const createdPurchaser =
      await this.purchasersService.create(createPurchaserDto);
    return {
      ok: true,
      message: 'Purchaser created successfully',
      data: createdPurchaser,
    };
  }

  @Put(':purchaserId')
  async updatePurchaser(
    @Param('purchaserId') purchaserId: string,
    @Body() body: UpdatePurchaserDTO,
  ) {
    const purchaser = await this.purchasersService.update(purchaserId, body);
    return {
      ok: true,
      message: 'Purchaser updated successfully',
      data: purchaser,
    };
  }

  @Delete(':purchaserId')
  async deletePurchaser(@Param('purchaserId') purchaserId: string) {
    console.log({ purchaserId });
    await this.purchasersService.remove(purchaserId);
    return {
      ok: true,
      message: 'Purchaser deleted successfully',
    };
  }

  @Get()
  async getAllPurchasers(@Query() params: FilterPurchaserDTO) {
    const purchasers = await this.purchasersService.findAll(params);
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
