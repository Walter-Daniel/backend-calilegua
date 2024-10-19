import { ApiProperty, OmitType, PartialType  } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({description: 'Product name'})
  @IsString()
  @IsNotEmpty()
  readonly name: string; //solo lectura

  @ApiProperty({description: 'Product description'})
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({description: 'Product price'})
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty({description: 'Product stock'})
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({description: 'Product origin'})
  @IsString()
  @IsNotEmpty()
  readonly origin: string;

  @ApiProperty({description: 'Product image'})
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['name']),
) {}
