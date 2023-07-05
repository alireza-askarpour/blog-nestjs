import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

enum Role {
  ADMIN = 'ADMIN',
  WRITER = 'WRITER',
  USER = 'USER',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
  })
  fullname: string

  @Prop({
    required: true,
    unique: true,
  })
  username: string

  @Prop({
    required: true,
  })
  password: string

  @Prop({
    default: Role.USER,
    enum: Role,
  })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
