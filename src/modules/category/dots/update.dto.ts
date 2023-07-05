import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator'

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The slug of category',
    type: String,
    example: 'backend',
  })
  @IsOptional()
  @IsString()
  slug: string

  @ApiProperty({
    description: 'The value of category',
    type: String,
    example: 'Backend',
  })
  @IsOptional()
  @IsString()
  value: string

  @ApiProperty({
    description: 'The disabled of category',
    type: Boolean,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
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
