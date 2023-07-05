import { HttpStatus, applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

export const ApiGetAll = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get all posts',
      description: 'get posts list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            posts: [
              {
                _id: '64a40f26a29fcbb3164e20ff',
                title: 'Test',
                description: 'Test desc',
                content:
                  '<h2>Roadmap for learning Node.js</h2><p>Learn to become a modern node.js developer using this roadmap.</p>',
                author: {
                  _id: '649f397c32fbd30989b81b28',
                  fullname: 'Alireza Askarpour',
                  username: 'alireza',
                  password:
                    '$2a$10$HnnjMnwltOFaLRsL1x3QHOZF03DMuRFakWj6FoLaTQQGvFZqcF4mG',
                  role: '2',
                },
                thumbnail: '',
                slug: 'taesta',
                short_link: 'WQK4m',
                category: {
                  _id: '64a020f3724e5f5f10492f40',
                  slug: 'nodejs',
                  value: 'NodeJs',
                },
                views: 0,
                tags: ['Backend', 'NodeJs', 'NestJs', 'TypeScript'],
                likes: [],
                bookmarks: [],
                createdAt: '2023-07-04T12:23:02.312Z',
                updatedAt: '2023-07-05T13:02:47.886Z',
              },
            ],
          },
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
