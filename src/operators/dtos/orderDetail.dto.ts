import {  PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';


export class CreateOrderDetailDTO {

  @ApiProperty({description: 'Product id'})
  @IsUUID()
  productId: string;

  @ApiProperty({description: 'Order id'})
  @IsUUID()
  orderId: string;

  @ApiProperty({description: 'Product quantity'})
  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateOrderDetailDTO extends PartialType(CreateOrderDetailDTO){
  @ApiProperty({ description: 'Total price' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  readonly totalPrice: number;
}
