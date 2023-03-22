import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Header } from '../../entity/header.entity';
import { interfaceReturnType } from '../../type/type';
@Injectable()
export class HeaderService {
  constructor(
    @InjectRepository(Header)
    private readonly headerList: Repository<Header>,
  ) {}

  async listFunc(): Promise<interfaceReturnType> {
    const res = await this.headerList.find();
    return {
      msg: 'ok',
      data: res,
      code: HttpStatus.OK,
    };
  }

  async addHeaderFunc(item: Header): Promise<interfaceReturnType> {
    if (!item.title) throw new BadRequestException('title为必填项～');
    await this.headerList.save({
      ...item,
      title: item.title || '',
      linkUrl: item.linkUrl || '',
    });
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }

  async updateHeader(item: Header): Promise<interfaceReturnType> {
    if (!item.id) throw new BadRequestException('id为必填项～');
    if (!item.title) throw new BadRequestException('title为必填项～');
    await this.headerList.update(item.id, {
      ...item,
      updataTime:new Date(),
    });
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }

  async deleteHeader(item: { id: number }): Promise<interfaceReturnType> {
    if (!item.id) throw new BadRequestException('id为必填项～');
    await this.headerList.delete(item.id);
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }
}
