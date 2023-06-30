import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'

import { User } from '../users/schema/user.schema'

import { SignUpDto } from './dtos/signup.dto'
import { LoginDto } from './dtos/login.dto'

import { ResponseFormat } from 'src/shared/interfaces/response.interface'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<ResponseFormat<any>> {
    try {
      const { fullname, username, password } = signupDto
      const duplicated = await this.userModel.findOne({ username })
      if (duplicated) {
        throw new BadRequestException(ResponseMessages.USERNAME_ALREADY_EXISTED)
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await this.userModel.create({
        fullname,
        username,
        password: hashedPassword,
      })
      const token = this.jwtService.sign({ id: user._id })
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          accessToken: token,
        },
      }
    } catch (error) {
      throw error
    }
  }

  async login(loginDto: LoginDto): Promise<ResponseFormat<any>> {
    try {
      const { username, password } = loginDto
      const user = await this.userModel.findOne({ username })
      if (!user) {
        throw new UnauthorizedException(
          ResponseMessages.INVALID_USERNAME_PASSWORD,
        )
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password)
      if (!isPasswordMatched) {
        throw new UnauthorizedException(
          ResponseMessages.INVALID_USERNAME_PASSWORD,
        )
      }
      const token = this.jwtService.sign({ id: user._id })
      return {
        statusCode: HttpStatus.OK,
        data: {
          accessToken: token,
        },
      }
    } catch (error) {
      throw error
    }
  }
}
