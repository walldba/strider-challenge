import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/:id/post')
  @UsePipes(new ValidationPipe())
  async createPost(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() postCreateRequestDto: PostCreateRequestDto,
  ) {
    return await this.userService.createPost(userId, postCreateRequestDto);
  }
}
