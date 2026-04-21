import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Post } from './post.entity';
import { Profile } from './profile.entity';
import { Tag } from './tag.entity';
import { PAGINATION_CONFIG } from './tokens';
import { MockUsersService } from './users.service.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserConfigModule } from './user-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Profile, Tag]),
    UserConfigModule.forRoot({
      defaultLimit: 10,
      maxLimit: 100,
    }),
  ],
  providers: [
    {
      provide: UsersService,
      useClass:
        process.env.NODE_ENV === 'test' ? MockUsersService : UsersService,
    },
    {
      provide: PAGINATION_CONFIG,
      useValue: {
        defaultLimit: 5,
        maxLimit: 50,
      },
    },
    {
      provide: 'USER_LOGIC',
      useFactory: (repo: Repository<User>) => {
        return {
          async getUsers(page: number, limit: number) {
            return repo.find({
              skip: (page - 1) * limit,
              take: limit,
            });
          },
        };
      },
      inject: [getRepositoryToken(User)],
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
