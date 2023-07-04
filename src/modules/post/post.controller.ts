import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { PostService } from './post.service'
import { CreatePostDto } from './dtos/create.dto'
import { UpdatePostDto } from './dtos/update.dto'

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

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
}
