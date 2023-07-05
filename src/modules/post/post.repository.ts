import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Post } from './models/post.model'
import { UpdatePostDto } from './dtos/update.dto'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

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
    return await this.postModel.findById(id).populate([
      {
        path: 'category',
        select: { slug: 1, value: 1, _id: 1 },
      },
      {
        path: 'author',
        select: { createdAt: 0, updatedAt: 0 },
      },
    ])
  }

  async update(id: string, postDto: UpdatePostDto) {
    return await this.postModel.updateOne({ _id: id }, postDto)
  }

  async delete(id: string) {
    return await this.postModel.deleteOne({ _id: id })
  }

  async getAll() {
    return await this.postModel.find().populate([
      {
        path: 'category',
        select: { slug: 1, value: 1, _id: 1 },
      },
      {
        path: 'author',
        select: { createdAt: 0, updatedAt: 0 },
      },
    ])
  }

  async like(postId: string, userId: string) {
    const likedPost = await this.postModel.findOne({
      _id: postId,
      likes: userId,
    })

    const updateQuery = likedPost
      ? { $pull: { likes: userId } }
      : { $push: { likes: userId } }
    await this.postModel.updateOne({ _id: postId }, updateQuery)

    return likedPost
      ? ResponseMessages.UNLIKED_POST
      : ResponseMessages.LIKED_POST
  }

  async bookmark(postId: string, userId: string) {
    const bookmarkedPost = await this.postModel.findOne({
      _id: postId,
      bookmarks: userId,
    })

    const updateQuery = bookmarkedPost
      ? { $pull: { bookmarks: userId } }
      : { $push: { bookmarks: userId } }
    await this.postModel.updateOne({ _id: postId }, updateQuery)

    return bookmarkedPost
      ? ResponseMessages.REMOVE_FROM_BOOKMARK
      : ResponseMessages.ADD_TO_BOOKMARK
  }
}
