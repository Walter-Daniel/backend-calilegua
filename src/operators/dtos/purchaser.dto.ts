import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreatePurchaserDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly operatorId?: string;
}

export class UpdatePurchaserDTO extends PartialType(CreatePurchaserDTO) {}
