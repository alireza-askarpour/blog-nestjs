import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

export const ApiCreate = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'create category',
      description: 'create a category',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          data: {
            _id: '64a01b450d95ead9c8ea82ba',
            name: 'nodejs',
            value: 'NodeJs',
            disabled: false,
            parent: '64a01b1f0d95ead9c8ea82b6',
            createdAt: '2023-07-01T12:25:41.099Z',
            updatedAt: '2023-07-01T12:25:41.099Z',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: 400,
          message: ResponseMessages.CATEGORY_ALREADY_EXISTS,
          error: 'Bad Request',
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: 400,
          message: ResponseMessages.PARENT_CATEGORY_NOT_EXISTS,
          error: 'Bad Request',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: 500,
          message: ResponseMessages.SERVER_ERROR,
          error: 'Internal Server Error',
        },
      },
    }),
  )
}
