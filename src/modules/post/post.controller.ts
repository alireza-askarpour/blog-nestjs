import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { PostService } from './post.service'
import { CreatePostDto } from './dtos/create.dto'

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
}
