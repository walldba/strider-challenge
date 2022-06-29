import { Module } from '@nestjs/common';
import { HomeService } from './services/home.service';

@Module({
  providers: [HomeService]
})
export class HomeModule {}
