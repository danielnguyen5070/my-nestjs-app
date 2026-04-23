import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SimpleAuthGuard } from './simple-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { TransformInterceptor } from './transform.interceptor';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(RolesGuard)
@UseGuards(SimpleAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  createUserWithPosts(@Body() body: CreateUserDto) {
    return this.service.createUserWithPosts(body);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.updateUser(Number(id), body);
  }

  @Roles('admin')
  @UseInterceptors(TransformInterceptor)
  @Get()
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        email: 'john@gmail.com',
      },
    },
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.service.findAll(page, limit);
  }
}
