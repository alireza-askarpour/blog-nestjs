import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Post {
  @Prop({
    required: true,
    min: 3,
    max: 255,
  })
  title: string

  @Prop({
    required: true,
    min: 3,
    max: 255,
  })
  description: string

  @Prop({
    required: true,
  })
  content: string

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  author: string

  @Prop({
    default: '',
  })
  thumbnail: string

  @Prop({
    required: true,
    min: 3,
    max: 50,
    unique: true,
  })
  slug: string

  @Prop({
    required: true,
  })
  short_link: string

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Category',
  })
  category: string

  @Prop({
    default: 0,
  })
  views: number

  @Prop({
    default: [],
  })
  tags: string[]

  @Prop({
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: 'User',
  })
  likes: string[]

  @Prop({
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: 'User',
  })
  bookmarks: string[]
}

export const PostSchema = SchemaFactory.createForClass(Post)
