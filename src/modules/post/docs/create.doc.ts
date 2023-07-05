import { HttpStatus, applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

export const ApiCreate = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create post',
      description: 'create a post',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            post: {
              title: 'Roadmap for learning Node.js',
              description:
                'Learn to become a modern node.js developer using this roadmap.',
              content:
                '<h2>Roadmap for learning Node.js</h2><p>Learn to become a modern node.js developer using this roadmap.</p>',
              author: '64a001868bf0667dbea62b00',
              thumbnail: '',
              slug: 'testssz',
              short_link: '4sKid',
              category: '64a020f3724e5f5f10492f40',
              views: 0,
              tags: ['Backend', 'NodeJs', 'NestJs', 'TypeScript'],
              likes: [],
              bookmarks: [],
              _id: '64a5742feae7ad5f8f9cc4d7',
              createdAt: '2023-07-05T13:46:23.734Z',
              updatedAt: '2023-07-05T13:46:23.734Z',
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.SLUG_ALREADY_EXIST,
          error: 'Bad Request',
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.BAD_REQUEST,
          error: 'Bad Request',
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ResponseMessages.SERVER_ERROR,
          error: 'Internal Server Error',
        },
      },
    }),
  )
}
