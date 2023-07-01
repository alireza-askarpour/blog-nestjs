import { applyDecorators } from '@nestjs/common'

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

export const ApiSignup = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'signup with username and password',
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
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: 400,
          message: ResponseMessages.USERNAME_ALREADY_EXISTED,
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
