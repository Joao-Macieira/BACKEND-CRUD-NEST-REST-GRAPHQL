import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './dto/product';
import { ProductInput } from './dto/product.input';

// eslint-disable-next-line
@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // eslint-disable-next-line
  @Query((returns) => [Product], { name: 'getAllProducts' })
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productService.findAll();
    const productsToReturn: Product[] = products.map((product) => {
      const productsToReturn = new Product();
      productsToReturn.id = product.id;
      productsToReturn.product = product.product;
      productsToReturn.price = product.price;

      return productsToReturn;
    });

    return productsToReturn;
  }

  // eslint-disable-next-line
  @Query((returns) => Product, { name: 'getProduct' })
  async getProduct(@Args('id') id: string): Promise<Product> {
    const product = await this.productService.findById(id);
    return product;
  }

  // eslint-disable-next-line
  @Mutation((returns) => Product, { name: 'createProduct' })
  async createProduct(@Args('input') input: ProductInput): Promise<Product> {
    return this.productService.create(input);
  }

  // eslint-disable-next-line
  @Mutation((returns) => Product, { name: 'updateProduct' })
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: ProductInput,
  ): Promise<Product> {
    return this.productService.update(id, input);
  }

  // eslint-disable-next-line
  @Mutation((returns) => Boolean, { name: 'deleteProduct' })
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    return this.productService.delete(id);
  }
}
