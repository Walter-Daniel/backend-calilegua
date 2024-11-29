import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateOrderItemDTO {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDTO {
  @ApiProperty({ description: 'Purchaser ID' })
  @IsNotEmpty()
  @IsMongoId()
  readonly purchaserId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  items: CreateOrderItemDTO[];
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}

export class AddProductToOrderDTO {
  @IsMongoId()
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}
