import { HttpStatus, applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

export const ApiGetCategories = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get all categories',
      description: 'get categories list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: [
            {
              _id: '64a0209b724e5f5f10492f3a',
              slug: 'backend',
              value: 'BackEnd',
              disabled: false,
              createdAt: '2023-07-01T12:48:27.212Z',
              updatedAt: '2023-07-01T13:36:02.631Z',
            },
            {
              _id: '64a020f3724e5f5f10492f40',
              slug: 'nodejs',
              value: 'NodeJs',
              disabled: false,
              parent: '64a0209b724e5f5f10492f3a',
              createdAt: '2023-07-01T12:49:55.792Z',
              updatedAt: '2023-07-01T12:49:55.792Z',
            },
            {
              _id: '64a021a3e5c97d602c5ef537',
              slug: 'express',
              value: 'Express',
              disabled: false,
              parent: '64a0209b724e5f5f10492f3a',
              createdAt: '2023-07-01T12:52:51.258Z',
              updatedAt: '2023-07-01T13:39:21.823Z',
            },
          ],
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
