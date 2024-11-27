import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({ description: 'Order date' })
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @ApiProperty({ description: 'Purchaser ID' })
  @IsNotEmpty()
  @IsMongoId()
  readonly purchaser: string;

  @ApiProperty({ description: 'Order products' })
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDTO extends PartialType(
  OmitType(CreateOrderDTO, ['products']),
) {}

export class AddProtuctToOrderDTO {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
