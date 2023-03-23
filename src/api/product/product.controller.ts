import { Controller, Get, Post, Body, Res,Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { interfaceReturnType } from '../../type/type';
import { Response } from 'express';
@Controller('Product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get()
  async getProductList(@Query() itme:{type:string}, @Res() Res: Response): Promise<interfaceReturnType> {
    console.log(itme);
    const res = await this.ProductService.listFunc(itme);
    Res.status(res.code).json(res);
    return;
  }

  @Post()
  async postProductList(
    @Body() body: any,
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.ProductService.addProductFunc(body);
    Res.status(res.code).json(res);
    return;
  }

  @Post('update')
  async updateProductList(
    @Body() body: any,
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.ProductService.updateProduct(body);
    Res.status(res.code).json(res);
    return;
  }

  @Post('delete')
  async deleteProductList(
    @Body() body: { id: number },
    @Res() Res: Response,
  ): Promise<interfaceReturnType> {
    const res = await this.ProductService.deleteProduct(body);
    Res.status(res.code).json(res);
    return;
  }

  //   @Post()
  //   async loginFunc(@Body() user: any, @Res() Res: Response): Promise<interfaceReturnType> {
  //     const res = await this.ProductService.listFunc(user);
  //     Res.status(res.code).json(res);
  //     return;
  //   }
}
