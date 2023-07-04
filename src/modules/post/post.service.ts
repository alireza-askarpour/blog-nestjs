import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'

import { PostRepository } from './post.repository'
import { CreatePostDto } from './dtos/create.dto'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'
import { ResponseFormat } from 'src/shared/interfaces/response.interface'

import {
  alphabetLetters,
  alphabetNumber,
  nanoid,
} from 'src/shared/utils/nanoid.util'
import { UpdatePostDto } from './dtos/update.dto'

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(postDto: CreatePostDto): Promise<ResponseFormat<any>> {
    const { title, description, content, slug, category, tags, author } =
      postDto

    const post = {
      title,
      description,
      content,
      slug,
      category,
      tags,
      author,
      short_link: nanoid(alphabetLetters + alphabetNumber, 5),
    }

    const existSlug = await this.postRepository.findPostBySlug(postDto.slug)
    if (existSlug) {
      throw new BadRequestException(ResponseMessages.SLUG_ALREADY_EXIST)
    }

    const createdPost = await this.postRepository.create(post)
    if (!createdPost) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_POST,
      )
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        post: createdPost,
      },
    }
  }

  async update(
    id: string,
    postDto: UpdatePostDto,
  ): Promise<ResponseFormat<any>> {
    const { title, description, content, slug, category, tags } = postDto

    const post = {
      title,
      description,
      content,
      slug,
      category,
      tags,
    }

    const existPost = await this.postRepository.findPostById(id)
    if (!existPost) {
      throw new BadRequestException(ResponseMessages.POST_NOT_FOUND)
    }

    const existSlug = await this.postRepository.findPostBySlug(postDto.slug)
    if (existSlug) {
      throw new BadRequestException(ResponseMessages.SLUG_ALREADY_EXIST)
    }

    const updatedPost = await this.postRepository.update(id, post)
    if (!updatedPost) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_POST,
      )
    }

    return {
      statusCode: HttpStatus.OK,
    }
  }

  async delete(id: string): Promise<ResponseFormat<any>> {
    const existPost = await this.postRepository.findPostById(id)
    if (!existPost) {
      throw new BadRequestException(ResponseMessages.POST_NOT_FOUND)
    }

    const deletedPost = await this.postRepository.delete(id)
    if (!deletedPost.deletedCount) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_POST,
      )
    }

    return {
      statusCode: HttpStatus.OK,
    }
  }

  async findById(id: string): Promise<ResponseFormat<any>> {
    const post = await this.postRepository.findPostById(id)
    if (!post) {
      throw new BadRequestException(ResponseMessages.POST_NOT_FOUND)
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        post,
      },
    }
  }

  async getAll() {
    const posts = await this.postRepository.getAll()
    if (!posts) {
      throw new BadRequestException(ResponseMessages.FAILED_GET_POSTS)
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        posts,
      },
    }
  }
}
