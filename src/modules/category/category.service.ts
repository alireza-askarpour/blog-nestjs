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
import { UpdateCategoryDto } from './dots/update.dto'
import { ResponseFormat } from 'src/shared/interfaces/response.interface'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  // create a category
  async create(createDto: CreateCategoryDto): Promise<ResponseFormat<any>> {
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

  // update a category by ID
  async update(
    id: string,
    updateDto: UpdateCategoryDto,
  ): Promise<ResponseFormat<any>> {
    try {
      const { slug, value, disabled, parent } = updateDto

      // check exist category
      await this.findCategoryById(id)

      // check exist parent category
      if (parent) {
        const existParentCategory = await this.categoryModel.findById(parent)
        if (!existParentCategory) {
          throw new BadRequestException(
            ResponseMessages.PARENT_CATEGORY_NOT_EXISTS,
          )
        }
      }

      // update category
      const updateResult = await this.categoryModel.updateOne(
        { _id: id },
        {
          slug,
          value,
          disabled,
          parent,
        },
      )
      if (!updateResult.modifiedCount) {
        throw new InternalServerErrorException(
          ResponseMessages.FAILED_UPDATE_CATEGORY,
        )
      }

      return {
        statusCode: HttpStatus.OK,
        data: {
          category: updateResult,
        },
      }
    } catch (err) {
      throw err
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
