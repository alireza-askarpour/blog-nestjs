import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { DocumentConfig } from './config/document.config'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets('uploads', {
    prefix: '/uploads/',
  })

  const documentConfig = new DocumentConfig(app)
  documentConfig.setupSwagger()

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT)
}

bootstrap()
