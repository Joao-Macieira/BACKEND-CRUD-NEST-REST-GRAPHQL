import { Inject, Injectable } from '@nestjs/common';
import { MysqlProvider } from 'src/database/mysql.provider';
import { Product } from './product.entity';

// Lida com o banco - Model
@Injectable()
export class ProductService {
  constructor(@Inject('DATABASE') private readonly mysql: MysqlProvider) {}
  async findAll(): Promise<Product[]> {
    const conn = await this.mysql.getConnection();
    const [results] = await conn.query('select * from products');
    const resultsPlain = JSON.parse(JSON.stringify(results));
    const products = resultsPlain.map((product) => {
      const productEntity = new Product();
      productEntity.id = product.id;
      productEntity.product = product.product;
      productEntity.price = product.price;
      return productEntity;
    });
    return products;
  }

  async findById(id: string): Promise<Product> {
    const conn = await this.mysql.getConnection();
    const [results] = await conn.query('select * from products where id = ?', [
      id,
    ]);
    const resultsPlain = JSON.parse(JSON.stringify(results));
    const products = resultsPlain.map((product) => {
      const productEntity = new Product();
      productEntity.id = product.id;
      productEntity.product = product.product;
      productEntity.price = product.price;
      return productEntity;
    });
    return products[0];
  }

  async create(product: Product): Promise<Product> {
    const conn = await this.mysql.getConnection();
    await conn.query('insert into products (product, price) values (?, ?)', [
      product.product,
      product.price,
    ]);

    return product;
  }

  async update(id: string, newProduct: Product): Promise<Product> {
    const conn = await this.mysql.getConnection();
    await conn.query(
      'update products set product = ?, price = ? where id = ?',
      [newProduct.product, newProduct.price, id],
    );
    return newProduct;
  }

  async delete(id: string): Promise<boolean> {
    const conn = await this.mysql.getConnection();
    await conn.query('delete from products where id = ? limit 1', [id]);

    return true;
  }
}
