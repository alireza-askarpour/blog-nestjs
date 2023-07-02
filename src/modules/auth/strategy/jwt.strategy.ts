import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Model } from 'mongoose'

import { User } from 'src/modules/users/schema/user.schema'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: any) {
    const { id } = payload

    const user = await this.userModel.findById(id)
    if (!user) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED)
    }
    return user
  }
}
