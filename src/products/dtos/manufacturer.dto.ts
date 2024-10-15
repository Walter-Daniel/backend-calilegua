import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';

export class CreateManufacturerDTO {
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateManufacturerDTO extends PartialType(
  OmitType(CreateManufacturerDTO, ['id']),
) {}
