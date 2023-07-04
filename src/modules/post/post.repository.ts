import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Post } from './models/post.model'
import { UpdatePostDto } from './dtos/update.dto'

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(postDto) {
    return await this.postModel.create(postDto)
  }

  async findPostBySlug(slug: string) {
    return await this.postModel.findOne({ slug })
  }

  async findPostById(id: string) {
    return await this.postModel.findById(id)
  }

  async update(id: string, postDto: UpdatePostDto) {
    return await this.postModel.updateOne({ _id: id }, postDto)
  }
}
