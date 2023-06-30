import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dtos/signup.dto'
import { LoginDto } from './dtos/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signup(signUpDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }
}
