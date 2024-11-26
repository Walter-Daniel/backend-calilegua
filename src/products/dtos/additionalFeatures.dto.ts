import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAdditionalFeatures {
  @ApiProperty({ description: 'Additional feature' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;
}

export class UpdateAdditionalFeatures extends PartialType(
  CreateAdditionalFeatures,
) {}
