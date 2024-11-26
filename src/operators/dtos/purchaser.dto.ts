import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsInt,
  Min,
  IsPositive,
  ValidateIf,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDTO } from './address.dto';

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

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDTO)
  readonly addresses: CreateAddressDTO[];
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
