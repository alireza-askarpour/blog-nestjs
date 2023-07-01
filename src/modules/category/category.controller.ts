import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CategoryService } from './category.service'

import { CreateCategoryDto } from './dots/create.dto'
import { UpdateCategoryDto } from './dots/update.dto'

import { ApiCreate } from './docs/create.doc'
import { ApiUpdate } from './docs/update.doc'
import { ApiGetCategory } from './docs/get-category.doc'
import { ApiGetCategories } from './docs/get-categories'

@ApiTags('Category')
@Controller('categories')
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

  @ApiGetCategories()
  @Get()
  async getCategories() {
    return await this.categoryService.getCategories()
  }

  @ApiGetCategory()
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return await this.categoryService.getCategory(id)
  }
}
