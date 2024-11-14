import { ApiProperty, OmitType, PartialType  } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { OperatorRole } from '../entities/operator.entity';

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
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'Operator role', enum: OperatorRole })
  @IsEnum(OperatorRole)
  readonly role: OperatorRole;

  @ApiProperty({ description: 'Related purchaser ID', required: false })
  @IsOptional()
  @IsUUID() // Verifica que sea un UUID válido
  readonly purchaserId?: string; // Marcado como opcional
}

export class UpdateOperatorDTO extends PartialType(
  OmitType(CreateOperatorDTO, ['password'])
) {}
