import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreatePurchaserDTO {
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}

export class UpdatePurchaserDTO extends PartialType(
  OmitType(CreatePurchaserDTO, ['id']),
) {}
