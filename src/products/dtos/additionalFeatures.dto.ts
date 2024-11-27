import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAdditionalFeaturesDTO {
  @ApiProperty({ description: 'Additional feature name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Additional feature description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateAdditionalFeaturesDTO extends PartialType(
  CreateAdditionalFeaturesDTO,
) {}
