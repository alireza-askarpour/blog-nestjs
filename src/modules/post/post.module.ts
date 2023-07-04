import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PostController } from './post.controller'
import { PostService } from './post.service'
import { Post, PostSchema } from './models/post.model'
import { PostRepository } from './post.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}