import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  @ApiProperty({
    description: 'The fullname of user',
    required: true,
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly fullname: string

  @ApiProperty({
    description: 'The username of user',
    required: true,
    type: String,
    example: 'johndoe',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string

  @ApiProperty({
    description: 'The password of user',
    required: true,
    type: String,
    example: 'johndoe@1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string
}
