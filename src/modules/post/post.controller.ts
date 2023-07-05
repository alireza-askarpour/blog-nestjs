import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { PostService } from './post.service'
import { CreatePostDto } from './dtos/create.dto'
import { UpdatePostDto } from './dtos/update.dto'
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id.pipe'
import { ApiCreate } from './docs/create.doc'
import { ApiGetAll } from './docs/get-all'
import { ApiUpdate } from './docs/update.doc'
import { ApiDelete } from './docs/delete.doc'
import { ApiGetOne } from './docs/get-one.doc'

@ApiBearerAuth()
@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  // get all posts
  @ApiGetAll()
  @Get()
  async getPosts() {
    return this.postService.getAll()
  }

  // create a post
  @UseGuards(AuthGuard())
  @ApiCreate()
  @Post()
  async createPost(@Body() postDto: CreatePostDto, @Req() req: any) {
    postDto.author = req.user._id
    return this.postService.create(postDto)
  }

  // update a post by ID
  @UseGuards(AuthGuard())
  @ApiUpdate()
  @Patch(':id')
  async updatePost(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() postDto: UpdatePostDto,
  ) {
    return this.postService.update(id, postDto)
  }

  // delete a post by ID
  @UseGuards(AuthGuard())
  @ApiDelete()
  @Delete(':id')
  async deletePost(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.postService.delete(id)
  }

  // get a post by ID
  @ApiGetOne()
  @Get(':id')
  async getPost(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.postService.findById(id)
  }
}
