import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name!: string;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePostDto)
  posts!: CreatePostDto[];
}
