import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Operator } from '../entities/operator.entity';
import { ProductsService } from 'src/products/services/products.service';
import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operator.dto';
import { PurchasersService } from './purchasers.service';

@Injectable()
export class OperatorsService {
  constructor(
    private productService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Operator) private operatorRepo: Repository<Operator>,
    private purchaserService: PurchasersService
  ) {}

  async findAll() {
    return await this.operatorRepo.find();
  }

  async totalOperators() {
    return await this.operatorRepo.count();
  }

  async findOne(id: string) {
    const operator = await this.operatorRepo.findOne({
      where: {id},
      relations: ['purchaser']
    });
    if (!operator) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }
    return operator;
  }

  async create(data: CreateOperatorDTO) {
    const newOperator = this.operatorRepo.create(data);
    if(data.purchaserId){
      const purchaser = await this.purchaserService.findOne(data.purchaserId);
      newOperator.purchaser = purchaser;
    }
    return await this.operatorRepo.save(newOperator);
  }

  async update(id: string, changes: UpdateOperatorDTO){
    const result = await this.operatorRepo.update(id, changes);
    if (result.affected === 0) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }
    return this.operatorRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const deleteResult = await this.operatorRepo.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }
  }

  async getOrderByUser(id: string) {
    const operator = this.operatorRepo.findOneBy({id});
    return {
      date: new Date(),
      operator,
      products: await this.productService.findAll(),
    };
  }

  
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
