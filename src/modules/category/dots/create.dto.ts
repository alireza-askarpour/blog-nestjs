import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The slug of category',
    required: true,
    type: String,
    example: 'backend',
  })
  @IsNotEmpty()
  @IsString()
  slug: string

  @ApiProperty({
    description: 'The value of category',
    required: true,
    type: String,
    example: 'Backend',
  })
  @IsNotEmpty()
  @IsString()
  value: string

  @ApiProperty({
    description: 'The disabled of category',
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  disabled: boolean

  @ApiProperty({
    description: 'The parent of category',
    type: String,
    example: '64a01b1f0d95ead9c8ea82b6',
  })
  @IsOptional()
  @IsMongoId()
  parent: string
}
