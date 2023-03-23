import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entity/product.entity';
import { interfaceReturnType } from '../../type/type';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductList: Repository<Product>,
  ) {}

  async listFunc(): Promise<interfaceReturnType> {
    const res = await this.ProductList.find();
    return {
      msg: 'ok',
      data: res,
      code: HttpStatus.OK,
    };
  }

  async addProductFunc(item: Product): Promise<interfaceReturnType> {
    if (!item.title) throw new BadRequestException('title为必填项～');
    if (!item.name) throw new BadRequestException('name为必填项～');
    if (!item.img) throw new BadRequestException('img为必填项～');
    await this.ProductList.save({
      ...item,
      title: item.title || '',
    });
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }

  async updateProduct(item: Product): Promise<interfaceReturnType> {
    if (!item.id) throw new BadRequestException('id为必填项～');
    await this.ProductList.update(item.id, {
      ...item,
      updataTime: new Date(),
    });
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }

  async deleteProduct(item: { id: number }): Promise<interfaceReturnType> {
    if (!item.id) throw new BadRequestException('id为必填项～');
    await this.ProductList.delete(item.id);
    return {
      msg: 'ok',
      data: null,
      code: HttpStatus.OK,
    };
  }
}
