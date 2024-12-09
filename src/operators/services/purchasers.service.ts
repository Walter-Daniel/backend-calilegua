import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Purchaser } from '../entities/purchaser.entity';
import {
  CreatePurchaserDTO,
  FilterPurchaserDTO,
  UpdatePurchaserDTO,
} from '../dtos/purchaser.dto';

@Injectable()
export class PurchasersService {
  constructor(
    @InjectModel(Purchaser.name) private purchaserModel: Model<Purchaser>,
  ) {}

  async findAll(params?: FilterPurchaserDTO): Promise<Purchaser[]> {
    const filters: FilterQuery<Purchaser> = {};
    const { limit, offset, maxAge, minAge } = params;
    if (maxAge && minAge) {
      filters.price = { $gte: minAge, $lte: maxAge };
    }
    const purchasers = await this.purchaserModel
      .find(filters)
      .skip(offset)
      .limit(limit);
    return purchasers;
  }

  async findOne(id: string) {
    const purchaser = await this.purchaserModel.findById(id);
    if (!purchaser) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
    return purchaser;
  }

  async create(data: CreatePurchaserDTO): Promise<Purchaser> {
    if (data.age < 18) {
      throw new BadRequestException('Purchaser must be at least 18 years old');
    }
    const newPurchaser = new this.purchaserModel(data);
    return await newPurchaser.save();
  }

  async update(id: string, changes: UpdatePurchaserDTO) {
    if (changes.age < 18) {
      throw new BadRequestException('Purchaser must be at least 18 years old');
    }
    const updatePurchaser = await this.purchaserModel.findByIdAndUpdate(
      id,
      changes,
      { new: true },
    );
    if (!updatePurchaser) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
    return this.purchaserModel.findById(id);
  }

  async remove(id: string) {
    const result = await this.purchaserModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
  }
}
