import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { CategoryModule } from './modules/category/category.module'
import { PostModule } from './modules/post/post.module'

import configuration from './config/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    CategoryModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
