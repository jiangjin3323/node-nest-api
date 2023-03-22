import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { BannerService } from './banner.service';
import { interfaceReturnType } from '../../type/type';
import { Response } from 'express';
@Controller('banner')
export class BannerController {
  constructor(private readonly BannerService: BannerService) {}

  @Get()
  async getBannerList(@Res() Res: Response): Promise<interfaceReturnType> {
    const res = await this.BannerService.listFunc();
    Res.status(res.code).json(res);
    return;
  }

  @Post()
  async postBannerList(
    @Body() body: any,
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.BannerService.addBannerFunc(body);
    Res.status(res.code).json(res);
    return;
  }

  @Post('update')
  async updateBannerList(
    @Body() body: any,
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.BannerService.updateBanner(body);
    Res.status(res.code).json(res);
    return;
  }

  @Post('delete')
  async deleteBannerList(
    @Body() body: { id: number },
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.BannerService.deleteBanner(body);
    Res.status(res.code).json(res);
    return;
  }

  //   @Post()
  //   async loginFunc(@Body() user: any, @Res() Res: Response): Promise<interfaceReturnType> {
  //     const res = await this.BannerService.listFunc(user);
  //     Res.status(res.code).json(res);
  //     return;
  //   }
}
