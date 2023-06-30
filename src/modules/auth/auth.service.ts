import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'

import { User } from '../users/schema/user.schema'
import { SignUpDto } from './dtos/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { fullname, username, password } = signupDto

      const hashedPassword = await bcrypt.hash(password, 10)

      const duplicated = await this.userModel.findOne({ username })
      if (duplicated) {
        throw new BadRequestException('Username already existed')
      }

      const user = await this.userModel.create({
        fullname,
        username,
        password: hashedPassword,
      })

      const token = this.jwtService.sign({ id: user._id })

      return { token }
    } catch (error) {
      throw error
    }
  }
}
