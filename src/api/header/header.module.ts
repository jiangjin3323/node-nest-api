import { Module } from '@nestjs/common';
import { HeaderController } from './header.controller';
import { HeaderService } from './header.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Header } from '../../entity/header.entity';
@Module({
  controllers: [HeaderController],
  providers: [HeaderService],
  imports: [TypeOrmModule.forFeature([Header])],
})
export class HeaderModule {}
