import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { CategoryModule } from './modules/category/category.module'
import { PostModule } from './modules/post/post.module'
import { UploadsModule } from './modules/uploads/uploads.module'

import configuration from './config/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MulterModule.register({ dest: './uploads' }),
    AuthModule,
    UsersModule,
    CategoryModule,
    PostModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
