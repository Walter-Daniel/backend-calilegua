import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDate, IsISO8601, IsDefined, ValidateNested, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOperatorDTO } from 'src/operators/dtos/operator.dto';
import { CreateProductDTO } from 'src/products/dtos/product.dto';

export class CreateOrderDTO {
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @IsDate()
  @IsISO8601()
  @IsDefined()
  @Type(() => Date)
  date: Date;

  @ValidateNested()
  @IsDefined()
  @Type(() => CreateOperatorDTO)
  operator: CreateOperatorDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @IsDefined()
  @Type(() => CreateProductDTO)
  products: CreateProductDTO[];
}

export class UpdateOrderDTO extends PartialType(
  OmitType(CreateOrderDTO, ['id']),
) {}
