import { Injectable, NotFoundException } from '@nestjs/common';
import { Manufacturer } from '../entities/manufacturer.entity';

import {
  CreateManufacturerDTO,
  UpdateManufacturerDTO,
} from '../dtos/manufacturer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectModel(Manufacturer.name)
    private manufacturerModel: Model<Manufacturer>,
  ) {}

  async findAll() {
    return await this.manufacturerModel.find({
      relations: ['products'],
    });
  }

  async findOne(id: string) {
    const manufacturer = await this.manufacturerModel.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with ID ${id} not found`);
    }
    return manufacturer;
  }

  create(data: CreateManufacturerDTO) {
    const newProduct = new this.manufacturerModel(data);
    return newProduct.save();
  }

  // async update(id: string, changes: UpdateManufacturerDTO): Promise<Manufacturer> {
  //   const result = await this.manufacturerModel.update(id, changes);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Manufacturer with ID ${id} not found`);
  //   }
  //   return this.manufacturerModel.findOneBy({ id });
  // }

  // async remove(id: string) {
  //   const deleteResult = await this.manufacturerModel.delete({ id });
  //   if (deleteResult.affected === 0) {
  //       throw new NotFoundException(`Product with ID ${id} not found`);
  //     }
  //     return deleteResult;
  // }
}
