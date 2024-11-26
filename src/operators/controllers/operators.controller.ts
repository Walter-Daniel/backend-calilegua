import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OperatorsService } from '../services/operators.service';
import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operator.dto';

@ApiTags('Operators')
@Controller('operators')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  // @Get('tasks') //
  // getTasks() {
  //     return this.operatorsService.getTasks();
  // }

  // @ApiOperation({summary: 'Create operator'})
  // @Post()
  // async createOperator(@Body() payload: CreateOperatorDTO) {
  //     const operator = await this.operatorsService.create(payload)
  //     return {
  //         ok: true,
  //         message: 'Operator created successfully',
  //         operator,
  //     };
  // }

  // @ApiOperation({summary: 'Update operator'})
  // @Put(':operatorId')
  // async updateOperator(
  //     @Param('operatorId') operatorId: string,
  //     @Body() body: UpdateOperatorDTO,
  // ) {
  //     const operatorToUpdate = await this.operatorsService.update(operatorId, body)
  //     return {
  //         ok: true,
  //         message: 'Operator updated successfully',
  //         data: operatorToUpdate,
  //     };
  // }

  @ApiOperation({ summary: 'Delete operator' })
  @Delete(':operatorId')
  async deleteOperator(@Param('operatorId') operatorId: string) {
    const operators = await this.operatorsService.remove(operatorId);
    return {
      ok: true,
      message: 'Operator deleted successfully',
      operatorId,
      delete: true,
      operators,
    };
  }

  @ApiOperation({ summary: 'Get all operators' })
  @Get()
  async getAllOperators() {
    const operators = await this.operatorsService.findAll();
    return {
      ok: true,
      message: 'All operators retrieved successfully',
      operators,
    };
  }

  @ApiOperation({ summary: 'Get operator by ID' })
  @Get(':operatorId')
  async getOperatorById(@Param('operatorId') operatorId: string) {
    const operator = await this.operatorsService.findOne(operatorId);
    return {
      ok: true,
      message: `Operator with ID ${operatorId} retrieved successfully`,
      operator,
    };
  }

  @ApiOperation({ summary: 'Get Orders by ID' })
  @Get(':id/orders')
  async getOrders(@Param('id') id: string) {
    return await this.operatorsService.getOrderByUser(id);
  }
}
