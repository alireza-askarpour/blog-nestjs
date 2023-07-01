import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Category } from './models/category.model'
import { CreateCategoryDto } from './dots/create.dto'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  // create a category
  async create(createDto: CreateCategoryDto) {
    const { slug, value, disabled, parent } = createDto

    // check exist category
    const existCategory = await this.categoryModel.findOne({ slug })
    if (existCategory) {
      throw new BadRequestException(ResponseMessages.CATEGORY_ALREADY_EXISTS)
    }

    // check exist parent category
    if (parent) {
      const existParentCategory = await this.categoryModel.findById(parent)
      if (!existParentCategory) {
        throw new BadRequestException(
          ResponseMessages.PARENT_CATEGORY_NOT_EXISTS,
        )
      }
    }

    // save category
    const category = await this.categoryModel.create({
      slug,
      value,
      disabled,
      parent,
    })
    if (!category) {
      throw new InternalServerErrorException(ResponseMessages.SERVER_ERROR)
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        category,
      },
    }
  }

  // find a category by ID
  async findCategoryById(id: string) {
    const category = await this.categoryModel.findById(id)
    if (!category) {
      throw new BadRequestException(ResponseMessages.CATEGORY_NOT_FOUND)
    }
    return category
  }

  // find a category by slug
  async findCategoryBySlug(slug: string) {
    const category = await this.categoryModel.findOne({ slug })
    if (!category) {
      throw new BadRequestException(ResponseMessages.CATEGORY_NOT_FOUND)
    }
    return category
  }
}
