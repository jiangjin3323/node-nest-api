import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from '../../entity/banner.entity';
@Module({
  controllers: [BannerController],
  providers: [BannerService],
  imports: [TypeOrmModule.forFeature([Banner])],
})
export class BannerModule {}
