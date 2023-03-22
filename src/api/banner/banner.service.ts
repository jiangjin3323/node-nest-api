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
        msg: 'url为必填项～',
        data: null,
        code: HttpStatus.FORBIDDEN,
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

  async updateBanner(banner: Banner): Promise<interfaceReturnType> {
    if (!banner.id) {
      return {
        msg: 'id为必填项～',
        data: null,
        code: HttpStatus.FORBIDDEN,
      };
    }
    if (!banner.url) {
      return {
        msg: 'url为必填项～',
        data: null,
        code: HttpStatus.FORBIDDEN,
      };
    }
    await this.bannerList.update(banner.id, {
      ...banner,
    });
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }

  async deleteBanner(banner: { id: number }): Promise<interfaceReturnType> {
    if (!banner.id) {
      return {
        msg: 'id为必填项～',
        data: null,
        code: HttpStatus.FORBIDDEN,
      };
    }
    await this.bannerList.delete(banner.id);
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }
}
