import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Operator } from '../../operators/entities/operators.entity';

import { OperatorsService } from '../../operators/services/operators.service';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private operatorsService: OperatorsService,
    private jwtService: JwtService,
  ) {}

  async generateJWT(operator: Operator) {
    const payload: PayloadToken = { role: operator.role, sub: operator.id };
    return {
      access_token: this.jwtService.sign(payload),
      operator,
    };
  }

  async validateUser(email: string, password: string) {
    const operator = await this.operatorsService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, operator.password);
    if (operator && isMatch) {
      const { password, ...rest } = operator.toJSON();
      return rest;
    }
    return null;
  }
}
