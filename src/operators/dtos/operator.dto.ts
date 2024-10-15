import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateOperatorDTO {
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsPositive()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateOperatorDTO extends PartialType(
  OmitType(CreateOperatorDTO, ['id']),
) {}
