import { IsNotEmpty, IsNumber, IsString, MaxLength, IsOptional, IsDate } from 'class-validator';

export class CreatePackageDto {
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
