import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { OperatorsService } from 'src/operators/services/operators.service';

@Injectable()
export class AuthService {
  constructor(private operatorsService: OperatorsService) {}

  async validateUser(email: string, password: string) {
    const operator = await this.operatorsService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, operator.password);
    if (operator && isMatch) {
      return operator;
    }
    return null;
  }
}
