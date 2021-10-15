import { DynamicModule, Global, Module } from '@nestjs/common';
import { MysqlProvider } from './mysql.provider';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const connFactory = {
      provide: 'DATABASE',
      useFactory: () => {
        return new MysqlProvider();
      },
    };

    return {
      module: DatabaseModule,
      providers: [connFactory],
      exports: ['DATABASE'],
    };
  }
}
