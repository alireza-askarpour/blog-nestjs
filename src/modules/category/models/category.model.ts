import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Category {
  @Prop({
    required: true,
    unique: true,
  })
  slug: string

  @Prop({
    required: true,
  })
  value: string

  @Prop({
    default: false,
  })
  disabled: boolean

  @Prop({
    default: undefined,
    ref: 'Category',
  })
  parent: mongoose.Types.ObjectId
}

export const CategorySchema = SchemaFactory.createForClass(Category)
