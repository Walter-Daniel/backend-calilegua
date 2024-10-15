import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateCategoryDTO {
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCategoryDTO extends PartialType(
  OmitType(CreateCategoryDTO, ['id']),
) {}
