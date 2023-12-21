import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AssignPackageDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly packageId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly price: string;


  @IsDateString()
  @IsOptional()
  readonly startDate: string;

  @IsDateString()
  @IsOptional()
  readonly expireDate: string;
}
