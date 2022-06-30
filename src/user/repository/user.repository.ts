import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }
  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['posts'] });
  }

  async findPostsPerDay(id: string): Promise<number> {
    const [result] = await this.userRepository.query(
      `SELECT COUNT(*) as total
    FROM posts
    WHERE "userId" = $1
    AND created_at >= now() - INTERVAL '24 hours'`,
      [id],
    );

    return Number(result.total);
  }
}
