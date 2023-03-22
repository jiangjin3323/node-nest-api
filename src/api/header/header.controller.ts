import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { HeaderService } from './header.service';
import { interfaceReturnType } from '../../type/type';
import { Response } from 'express';
@Controller('header')
export class HeaderController {
  constructor(private readonly HeaderService: HeaderService) {}

  @Get()
  async getHeaderList(@Res() Res: Response): Promise<interfaceReturnType> {
    const res = await this.HeaderService.listFunc();
    Res.status(res.code).json(res);
    return;
  }

  @Post()
  async postHeaderList(
    @Body() body: any,
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.HeaderService.addHeaderFunc(body);
    Res.status(res.code).json(res);
    return;
  }

  @Post('update')
  async updateHeaderList(
    @Body() body: any,
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.HeaderService.updateHeader(body);
    Res.status(res.code).json(res);
    return;
  }

  @Post('delete')
  async deleteHeaderList(
    @Body() body: { id: number },
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.HeaderService.deleteHeader(body);
    Res.status(res.code).json(res);
    return;
  }

  //   @Post()
  //   async loginFunc(@Body() user: any, @Res() Res: Response): Promise<interfaceReturnType> {
  //     const res = await this.HeaderService.listFunc(user);
  //     Res.status(res.code).json(res);
  //     return;
  //   }
}
