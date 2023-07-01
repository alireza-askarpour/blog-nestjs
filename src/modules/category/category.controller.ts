import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dots/create.dto'

import { ApiCreate } from './docs/create.doc'
import { ApiUpdate } from './docs/update.doc'
import { UpdateCategoryDto } from './dots/update.dto'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiCreate()
  @Post()
  async createCategory(@Body() createDto: CreateCategoryDto) {
    return await this.categoryService.create(createDto)
  }

  @ApiUpdate()
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, updateDto)
  }
}
