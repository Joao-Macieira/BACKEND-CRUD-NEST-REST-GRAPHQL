import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  async update(
    @Body() newProduct: Product,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.update(id, newProduct);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.productService.delete(id);
  }
}
