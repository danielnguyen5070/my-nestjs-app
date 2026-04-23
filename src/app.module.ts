import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import databaseConfig from './config/database.config';

type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.getOrThrow<DatabaseConfig>('database');

        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),

    UsersModule,
  ],
})
export class AppModule {}
