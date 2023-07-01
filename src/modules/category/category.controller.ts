import { Body, Controller, Post } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dots/create.dto'
import { ApiTags } from '@nestjs/swagger'
import { ApiCreate } from './docs/create.doc'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiCreate()
  @Post()
  async createCategory(@Body() createDto: CreateCategoryDto) {
    return await this.categoryService.create(createDto)
  }
}
