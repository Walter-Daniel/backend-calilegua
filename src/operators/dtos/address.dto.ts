import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  readonly number: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly city: string;
}

export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {}
