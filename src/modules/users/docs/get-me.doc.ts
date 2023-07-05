import { HttpStatus, applyDecorators } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

export const ApiGetMe = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get loggedin user',
      description: 'get loggedin user',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: HttpStatus.OK,
          data: {
            user: {},
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
