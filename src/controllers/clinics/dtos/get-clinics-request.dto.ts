import { ClinicTypeEnum } from '@enums/clinic-type-enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsHourFormat, IsValidState } from '../validators';

class GetClinicsRequestDTO {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  @IsValidState()
  public state?: string;

  @IsOptional()
  @IsString()
  @IsHourFormat()
  @ApiProperty({ description: 'Availability from (must be an hour in the format HH:mm)' })
  public from?: string;

  @IsOptional()
  @IsString()
  @IsHourFormat()
  @ApiProperty({ description: 'Availability to (must be an hour in the format HH:mm)' })
  public to?: string;

  @IsOptional()
  @IsEnum(ClinicTypeEnum)
  public type?: ClinicTypeEnum;
}

export { GetClinicsRequestDTO };
