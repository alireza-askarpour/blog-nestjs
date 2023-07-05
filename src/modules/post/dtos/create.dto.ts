import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of post',
    required: true,
    type: String,
    example: 'Roadmap for learning Node.js',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string

  @ApiProperty({
    description: 'The description of post',
    required: true,
    type: String,
    example: 'Learn to become a modern node.js developer using this roadmap.',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string

  @ApiProperty({
    description: 'The content of post',
    required: true,
    type: String,
    example:
      '<h2>Roadmap for learning Node.js</h2><p>Learn to become a modern node.js developer using this roadmap.</p>',
  })
  @IsNotEmpty()
  @IsString()
  content: string

  @IsOptional()
  @IsMongoId()
  author: string

  @ApiProperty({
    description: 'The slug of post',
    required: true,
    type: String,
    example: 'roadmap-nodejs',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  slug: string

  @ApiProperty({
    description: 'The category of post',
    required: true,
    type: String,
    example: '64a03b5e9f7f86e9c7db2d99',
  })
  @IsNotEmpty()
  @IsMongoId()
  category: string

  @ApiProperty({
    description: 'The tags of post',
    required: true,
    type: Array,
    example: ['Backend', 'NodeJs', 'NestJs', 'TypeScript'],
  })
  @IsNotEmpty()
  @IsArray()
  tags: string[]
}
