import {
  Controller,
  Get,
  HttpStatus,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { ApiGetMe } from './docs/get-me.doc'
import { UsersService } from './users.service'
import { ResponseFormat } from 'src/shared/interfaces/response.interface'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // get logged in user
  @UseGuards(AuthGuard())
  @ApiGetMe()
  @Get('@me')
  getMe(@Req() req: any): ResponseFormat<any> {
    if (!req.user) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED)
    }

    delete req.user.password

    return {
      statusCode: HttpStatus.OK,
      data: {
        user: req.user,
      },
    }
  }
}
