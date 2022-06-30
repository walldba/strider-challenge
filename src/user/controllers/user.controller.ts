import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { PostLimitFilterResquestDto } from '../../post/dto/post-limit-request.dto';
import { parsePaginationOptions } from '../../shared/utils/pagination.util';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findById(id);
  }

  @Get('/:id/posts')
  async findPosts(
    @Param('id', ParseUUIDPipe) userId: string,
    @Query() limitFilterResquestDto: PostLimitFilterResquestDto,
  ) {
    return await this.userService.findPosts(
      userId,
      parsePaginationOptions(limitFilterResquestDto),
    );
  }

  @Post('/:id/post')
  @UsePipes(new ValidationPipe())
  async createPost(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() postCreateRequestDto: PostCreateRequestDto,
  ) {
    return await this.userService.createPost(userId, postCreateRequestDto);
  }
}
