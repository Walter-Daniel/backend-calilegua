import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
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

    @Get('tasks') //
    getTasks() {
        return this.operatorsService.getTasks();
    }


    @ApiOperation({summary: 'Create operator'})
    @Post()
    createOperator(@Body() payload: CreateOperatorDTO) {
        return {
            ok: true,
            message: 'Operator created successfully',
            payload,
        };
    }

    @ApiOperation({summary: 'Update operator'})
    @Put(':operatorId')
    updateOperator(
        @Param('operatorId') operatorId: string,
        @Body() body: UpdateOperatorDTO,
    ) {
        return {
            ok: true,
            message: 'Operator updated successfully',
            data: body,
        };
    }

    @ApiOperation({summary: 'Delete operator'})
    @Delete(':operatorId')
    deleteOperator(@Param('operatorId', ParseIntPipe) operatorId: number) {
        const operators = this.operatorsService.remove(operatorId);
        return {
            ok: true,
            message: 'Operator deleted successfully',
            operatorId,
            delete: true,
            operators,
            count: operators.length,
        };
    }

    @ApiOperation({summary: 'Get all operators'})
    @Get()
    getAllOperators() {
        const operators = this.operatorsService.findAll();
        return {
            ok: true,
            message: 'All operators retrieved successfully',
            operators,
        };
    }

    @ApiOperation({summary: 'Get operator by ID'})
    @Get(':operatorId')
    getOperatorById(@Param('operatorId', ParseIntPipe) operatorId: number) {
        const operator = this.operatorsService.findOne(operatorId);
        return {
            ok: true,
            message: `Operator with ID ${operatorId} retrieved successfully`,
            operator,
        };
    }

    @ApiOperation({summary: 'Get Orders by ID'})
    @Get(':id/orders')
    getOrders(@Param('id', ParseIntPipe) id: number){
        return this.operatorsService.getOrderByUser(id)
    }
}
