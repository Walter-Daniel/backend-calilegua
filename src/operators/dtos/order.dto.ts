import {  PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';


export class CreateOrderDTO {
  @ApiProperty({description: 'Purchaser id'})
  @IsUUID()
  purchaserId: string;

}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO){}
