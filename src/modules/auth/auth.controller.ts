import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dtos/signup.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return await this.authService.signup(signUpDto)
  }
}
