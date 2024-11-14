import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsInt,
  Min,
  IsPositive,
  ValidateIf,
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
  @IsInt()
  @Min(18, { message: 'Purchaser must be at least 18 years old' })
  @IsNotEmpty()
  readonly age: number;

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

export class FilterPurchaserDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
  
  @IsOptional()
  @IsPositive()
  minAge: number;

  @ValidateIf((item) => item.minAge)
  @IsPositive()
  maxAge: number;
}