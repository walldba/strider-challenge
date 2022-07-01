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
import { parsePaginationOptions } from '../../shared/utils/pagination.util';
import { HomeFindRequestDto } from '../dto/home-find-request.dto';
import { HomeLimitFilterResquestDto } from '../dto/home-limit-request.dto';
import { HomeService } from '../services/home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/posts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findPosts(
    @Query() homeFindRequestDto: HomeFindRequestDto,
    @Query() homeLimitFilterResquestDto: HomeLimitFilterResquestDto,
  ) {
    return await this.homeService.findPosts(
      homeFindRequestDto,
      parsePaginationOptions(homeLimitFilterResquestDto),
    );
  }

  @Post('/:userId/post')
  @UsePipes(new ValidationPipe())
  async createPost(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() postCreateRequestDto: PostCreateRequestDto,
  ) {
    return await this.homeService.createPost(userId, postCreateRequestDto);
  }
}
