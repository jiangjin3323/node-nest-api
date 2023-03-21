import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from '../../entity/banner.entity';
import { interfaceReturnType } from '../../type/type';
@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerList: Repository<Banner>,
  ) {}

  async listFunc(): Promise<interfaceReturnType> {
    const res = await this.bannerList.find();
    return {
      msg: 'ok',
      data: res,
      code: HttpStatus.OK,
    };
  }

  async addBannerFunc(banner: Banner): Promise<interfaceReturnType> {
    if (!banner.url) {
      return {
        msg: '轮播“url”未必填项～',
        data: null,
        code: HttpStatus.NOT_FOUND,
      };
    }
    await this.bannerList.save({
      ...banner,
      title: banner.title || '',
      linkUrl: banner.linkUrl || '',
    });
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }
}
