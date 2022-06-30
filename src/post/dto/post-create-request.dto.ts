import { IsEnum, IsUUID, ValidateIf } from 'class-validator';
import { Post } from '../entities/post.entity';
import { PostTypeEnum } from '../enums/post-type.enum';
import { IsValidContentByType } from '../validators/post.validator';

export class PostCreateRequestDto {
  @IsValidContentByType()
  content: string;

  @IsEnum(PostTypeEnum)
  type: PostTypeEnum;

  @ValidateIf((o) => o.type != PostTypeEnum.ORIGINAL)
  @IsUUID()
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
