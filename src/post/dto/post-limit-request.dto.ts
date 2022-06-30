import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class PostLimitFilterResquestDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  take: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  skip: number;
}
