import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostLimitFilterResquestDto } from '../../post/dto/post-limit-request.dto';
import { parsePaginationOptions } from '../../shared/utils/pagination.util';
import { HomeFindRequestDto } from '../dto/home-find-request.dto';
import { HomeService } from '../services/home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/posts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findPosts(
    @Query() homeFindRequestDto: HomeFindRequestDto,
    @Query() limitFilterResquestDto: PostLimitFilterResquestDto,
  ) {
    return await this.homeService.findPosts(
      homeFindRequestDto,
      parsePaginationOptions(limitFilterResquestDto),
    );
  }
}
