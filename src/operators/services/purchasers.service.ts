import { Injectable, NotFoundException } from '@nestjs/common';
import { Purchaser } from '../entities/purchaser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaserDTO, UpdatePurchaserDTO } from '../dtos/purchaser.dto';

@Injectable()
export class PurchasersService {
  constructor(
    @InjectRepository(Purchaser) private purchaserRepo: Repository<Purchaser>,
  ) {}

  findAll() {
    return this.purchaserRepo.find();
  }

  totalPurchasers() {
    return this.purchaserRepo.count();
  }

  findOne(id: string) {
    const purchaser = this.purchaserRepo.findOneBy({ id });
    if (!purchaser) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
    return purchaser;
  }

  async create(data: CreatePurchaserDTO) {
    const newProduct = this.purchaserRepo.create(data);
    return await this.purchaserRepo.save(newProduct);
  }

  async update(id: string, changes: UpdatePurchaserDTO) {
    const result = await this.purchaserRepo.update(id, changes);
    if (result.affected === 0) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
    return this.purchaserRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const deleteResult = await this.purchaserRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Purchaser with ID ${id} not found`);
    }
  }
}
