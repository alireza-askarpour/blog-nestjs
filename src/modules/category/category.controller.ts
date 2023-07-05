import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CategoryService } from './category.service'

import { CreateCategoryDto } from './dots/create.dto'
import { UpdateCategoryDto } from './dots/update.dto'

import { ApiCreate } from './docs/create.doc'
import { ApiUpdate } from './docs/update.doc'
import { ApiDelete } from './docs/delete.doc'
import { ApiGetCategory } from './docs/get-category.doc'
import { ApiGetCategories } from './docs/get-categories'

import { ParseMongoIdPipe } from '../../shared/pipes/parse-mongo-id.pipe'

@ApiBearerAuth()
@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // create a category
  @UseGuards(AuthGuard())
  @ApiCreate()
  @Post()
  async createCategory(@Body() createDto: CreateCategoryDto) {
    return await this.categoryService.create(createDto)
  }

  // update a category by ID
  @UseGuards(AuthGuard())
  @ApiUpdate()
  @Patch(':id')
  async updateCategory(
    @Param('id', new ParseMongoIdPipe()) id: string,
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
  async getCategoryById(@Param('id', new ParseMongoIdPipe()) id: string) {
    return await this.categoryService.getCategory(id)
  }

  // delete a category by ID
  @UseGuards(AuthGuard())
  @ApiDelete()
  @Delete(':id')
  async deleteCategoryById(@Param('id', new ParseMongoIdPipe()) id: string) {
    return await this.categoryService.delete(id)
  }
}
