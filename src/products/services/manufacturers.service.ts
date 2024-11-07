import { Injectable, NotFoundException } from '@nestjs/common';
import { Manufacturer } from '../entities/manufacturer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManufacturerDTO, UpdateManufacturerDTO } from '../dtos/manufacturer.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepo: Repository<Manufacturer>,
  ) {}
  
  async findAll() {
    return await this.manufacturerRepo.find({
      relations: ['products']
    });
  }

  async totalManufacturers() {
    return await this.manufacturerRepo.count();
  }

  async findOne(id: string) {
    const manufacturer = await this.manufacturerRepo.findOne({ 
      where: {id},
      relations: ['products']
     });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with ID ${id} not found`);
    }
    return manufacturer;
  }

  create(data: CreateManufacturerDTO) {
    const newProduct = this.manufacturerRepo.create(data);
    return this.manufacturerRepo.save(newProduct);
  }

  async update(id: string, changes: UpdateManufacturerDTO): Promise<Manufacturer> {
    const result = await this.manufacturerRepo.update(id, changes);
    if (result.affected === 0) {
      throw new NotFoundException(`Manufacturer with ID ${id} not found`);
    }
    return this.manufacturerRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const deleteResult = await this.manufacturerRepo.delete({ id });
    if (deleteResult.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return deleteResult;
  }
}
