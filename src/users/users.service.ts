import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  createUserWithPosts(dto: CreateUserDto) {
    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      posts: dto.posts,
    });

    return this.repo.save(user);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.repo.findAndCount({
      relations: ['profile', 'posts'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    // update basic fields
    if (dto.name) user.name = dto.name;
    if (dto.email) user.email = dto.email;
    if (dto.password) user.password = dto.password;

    // update posts (optional)
    if (dto.posts) {
      user.posts = dto.posts.map((post) =>
        this.repo.manager.create('Post', {
          ...post,
          user,
        }),
      );
    }

    return this.repo.save(user);
  }
}
