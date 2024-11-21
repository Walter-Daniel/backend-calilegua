import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  MaxLength,
  IsInt,
  IsUUID,
  IsArray,
  ArrayMinSize,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string; //solo lectura

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty({ description: 'Product stock' })
  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({ description: 'Product origin' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly origin: string;

  @ApiProperty({ description: 'Product image' })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
