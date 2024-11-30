import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Operator } from '../entities/operators.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOperatorDTO } from '../dtos/operators.dto';

@Injectable()
export class OperatorsService {
  @InjectModel(Operator.name) private operatorModel: Model<Operator>;

  async create(data: CreateOperatorDTO) {
    const newOperator = new this.operatorModel(data);
    const hashPassword = await bcrypt.hash(newOperator.password, 10);
    newOperator.password = hashPassword;
    const operator = await newOperator.save();
    const { password, ...rest } = operator.toJSON();
    return rest;
  }

  async findByEmail(email: string) {
    const operator = await this.operatorModel.findOne({ email }).exec();
    if (!operator) {
      throw new NotFoundException(`Operator with email ${email} not found`);
    }
    return operator;
  }
}
