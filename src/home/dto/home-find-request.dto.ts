import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsDateString,
  IsUUID,
  ValidateIf,
  IsBooleanString,
  IsBoolean,
} from 'class-validator';

export class HomeFindRequestDto {
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  onlyMyPosts: boolean;

  @ValidateIf((o) => o.onlyMyPosts)
  @IsUUID()
  userId: string;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;
}
