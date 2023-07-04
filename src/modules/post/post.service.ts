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
import { getOnlyText } from 'src/shared/utils/get-only-text.util'

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
}
