import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  MaxLength,
  IsInt,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAdditionalFeaturesDTO } from './additionalFeatures.dto';

export class CreateProductDTO {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty({ description: 'Product stock' })
  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({ description: 'Product origin' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly origin: string;

  @ApiProperty({ description: 'Product image' })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  // @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAdditionalFeaturesDTO)
  readonly additionalFeatures: CreateAdditionalFeaturesDTO[];

  @IsNotEmpty()
  @IsMongoId()
  readonly manufacturer: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductDTO {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;

  @IsOptional()
  @Min(0)
  minPrice?: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
