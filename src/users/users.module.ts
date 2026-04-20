import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Post } from './post.entity';
import { Profile } from './profile.entity';
import { Tag } from './tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Profile, Tag])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
