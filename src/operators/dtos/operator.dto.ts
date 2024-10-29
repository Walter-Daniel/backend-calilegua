import { ApiProperty, OmitType, PartialType  } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateOperatorDTO {
  @ApiProperty({description: 'Operator name'})
  @IsNumber()
  @IsPositive()
  readonly id: number;

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
}

export class UpdateOperatorDTO extends PartialType(
  OmitType(CreateOperatorDTO, ['id']),
) {}
