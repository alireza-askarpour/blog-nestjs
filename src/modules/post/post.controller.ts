import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { PostService } from './post.service'
import { CreatePostDto } from './dtos/create.dto'
import { UpdatePostDto } from './dtos/update.dto'

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  // get all posts
  @Get()
  async getPosts() {
    return this.postService.getAll()
  }

  // create a post
  @Post()
  async createPost(@Body() postDto: CreatePostDto, @Req() req: Request) {
    postDto.author = '649f397c32fbd30989b81b28'
    return this.postService.create(postDto)
  }

  // update a post by ID
  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() postDto: UpdatePostDto) {
    return this.postService.update(id, postDto)
  }

  // delete a post by ID
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.delete(id)
  }

  // get a post by ID
  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.findById(id)
  }
}
