import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Purchaser } from '../entities/purchaser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { CreatePurchaserDTO, FilterPurchaserDTO, UpdatePurchaserDTO } from '../dtos/purchaser.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class PurchasersService {
  constructor(
    @InjectRepository(Purchaser) private purchaserRepo: Repository<Purchaser>,
  ) {}

  async findAll(params?: FilterPurchaserDTO) {
    const where: FindOptionsWhere<Purchaser> = {};
      const { limit, offset, maxAge, minAge } = params;
      if(minAge && maxAge) {
        where.age = Between(minAge, maxAge);
      }
      return await this.purchaserRepo.find({
        relations: ['order'],
        take: limit,
        skip: offset
      })
  }

  async totalPurchasers() {
    return await this.purchaserRepo.count();
  }

  async findOne(id: string) {
    const purchaser = await this.purchaserRepo.findOneBy({ id });
    if (!purchaser) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
    return purchaser;
  }

  async create(data: CreatePurchaserDTO) {
    if (data.age < 18) {
      throw new BadRequestException('Purchaser must be at least 18 years old');
    }
    const newProduct = this.purchaserRepo.create(data);
    return await this.purchaserRepo.save(newProduct);
  }

  async update(id: string, changes: UpdatePurchaserDTO) {
    if (changes.age < 18) {
      throw new BadRequestException('Purchaser must be at least 18 years old');
    }
    const result = await this.purchaserRepo.update(id, changes);
    if (result.affected === 0) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
    return this.purchaserRepo.findOneBy({ id });
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format for ID: #${id}`);
    }
    const deleteResult = await this.purchaserRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
  }
}
