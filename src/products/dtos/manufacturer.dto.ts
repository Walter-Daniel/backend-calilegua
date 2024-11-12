import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateManufacturerDTO {
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

export class UpdateManufacturerDTO extends PartialType(CreateManufacturerDTO) {}
