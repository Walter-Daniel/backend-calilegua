import { Body, Controller, Post } from '@nestjs/common';
import { OperatorsService } from '../services/operators.service';
import { CreateOperatorDTO } from '../dtos/operators.dto';

@Controller('operators')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  @Post()
  async register(@Body() payload: CreateOperatorDTO) {
    const operator = await this.operatorsService.create(payload);
    return {
      ok: true,
      message: 'Operator created successfully',
      data: operator,
    };
  }
}
