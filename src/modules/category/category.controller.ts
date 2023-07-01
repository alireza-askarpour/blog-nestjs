import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CategoryService } from './category.service'

import { CreateCategoryDto } from './dots/create.dto'
import { UpdateCategoryDto } from './dots/update.dto'

import { ApiCreate } from './docs/create.doc'
import { ApiUpdate } from './docs/update.doc'
import { ApiGetCategory } from './docs/get-category.doc'
import { ApiGetCategories } from './docs/get-categories'
import { ApiDelete } from './docs/delete.doc'

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // create a category
  @ApiCreate()
  @Post()
  async createCategory(@Body() createDto: CreateCategoryDto) {
    return await this.categoryService.create(createDto)
  }

  // update a category by ID
  @ApiUpdate()
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, updateDto)
  }

  // get all categories
  @ApiGetCategories()
  @Get()
  async getCategories() {
    return await this.categoryService.getCategories()
  }

  // get category by ID
  @ApiGetCategory()
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return await this.categoryService.getCategory(id)
  }

  // delete a category by ID
  @ApiDelete()
  @Delete(':id')
  async deleteCategoryById(@Param('id') id: string) {
    return await this.categoryService.delete(id)
  }
}
