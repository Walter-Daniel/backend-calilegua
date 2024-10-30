import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCategoryDTO extends PartialType(
  CreateCategoryDTO,
) {}
