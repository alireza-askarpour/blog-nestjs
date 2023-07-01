import { applyDecorators } from '@nestjs/common'

import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

export const ApiLogin = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'login with username and password',
      description: 'get Jwt Token',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: {
            accessToken: 'xxxx',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: 401,
          message: ResponseMessages.INVALID_USERNAME_PASSWORD,
          error: 'Bad Request',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          statusCode: 500,
          message: ResponseMessages.SERVER_ERROR,
          error: 'Internal Server Error ',
        },
      },
    }),
  )
}
