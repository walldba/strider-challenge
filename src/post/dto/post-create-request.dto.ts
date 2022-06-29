import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Post } from '../entities/post.entity';
import { PostTypeEnum } from '../enums/post-type.enum';

export class PostCreateRequestDto {
  @IsString()
  @MaxLength(777)
  content: string;

  @IsEnum(PostTypeEnum)
  type: PostTypeEnum;

  @IsUUID()
  @IsOptional()
  originalPostId?: string;

  static toEntity(
    userId: string,
    postCreateRequestDto: PostCreateRequestDto,
  ): Post {
    return new Post({
      content: postCreateRequestDto.content,
      type: postCreateRequestDto.type,
      originalPostId: postCreateRequestDto.originalPostId,
      user: { id: userId },
    });
  }
}
