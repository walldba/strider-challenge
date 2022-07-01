import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class HomeLimitFilterResquestDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  @Type(() => Number)
  take: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  skip: number;
}
