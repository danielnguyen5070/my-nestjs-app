import { Module, DynamicModule } from '@nestjs/common';

@Module({})
export class UserConfigModule {
  static forRoot(options: {
    defaultLimit: number;
    maxLimit: number;
  }): DynamicModule {
    return {
      module: UserConfigModule,
      providers: [
        {
          provide: 'PAGINATION_CUSTOM',
          useValue: options,
        },
      ],
      exports: ['PAGINATION_CUSTOM'],
    };
  }
}
