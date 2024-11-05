import { ApiProperty, OmitType, PartialType  } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateOperatorDTO {
  @ApiProperty({description: 'Operator name'})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({description: 'Operator lastname'})
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({description: 'Operator email'})
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({description: 'Operator password'})
  @IsNumber()
  @IsPositive()
  readonly password: string;

  @ApiProperty({description: 'Operator role'})
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  readonly purchaserId: string;
}

export class UpdateOperatorDTO extends PartialType(CreateOperatorDTO) {}
