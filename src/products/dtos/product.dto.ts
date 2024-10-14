import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string; //solo lectura

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  readonly origin: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['name']),
) {}
