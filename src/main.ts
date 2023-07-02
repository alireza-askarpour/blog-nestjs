import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { ConfigsType } from './config/app.config'
import { DocumentConfig } from './config/document.config'
import { AppModeConstant } from './shared/constants/app-mode.constant'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const documentConfig = new DocumentConfig(app)
  documentConfig.setupSwagger()

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT)
}

bootstrap()
