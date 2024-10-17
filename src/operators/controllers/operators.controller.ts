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
import { OperatorsService } from '../services/operators.service';
import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operator.dto';

@Controller('operators')
export class OperatorsController {
    constructor(private operatorsService: OperatorsService) {}

    @Post()
    createOperator(@Body() payload: CreateOperatorDTO) {
        return {
            ok: true,
            message: 'Operator created successfully',
            payload,
        };
    }

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

    @Get()
    getAllOperators() {
        const operators = this.operatorsService.findAll();
        return {
            ok: true,
            message: 'All operators retrieved successfully',
            operators,
        };
    }

    @Get(':operatorId')
    getOperatorById(@Param('operatorId', ParseIntPipe) operatorId: number) {
        const operator = this.operatorsService.findOne(operatorId);
        return {
            ok: true,
            message: `Operator with ID ${operatorId} retrieved successfully`,
            operator,
        };
    }

    @Get(':id/orders')
    getOrders(@Param('id', ParseIntPipe) id: number){
        return this.operatorsService.getOrderByUser(id)
    }
}
