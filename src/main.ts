import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { SwaggerTheme } from 'swagger-themes'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('NestJs Blog')
    .setDescription('The Blog API with NestJs and MongoDB')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  const theme = new SwaggerTheme('v3')
  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  }
  SwaggerModule.setup('api', app, document, options)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT)
}

bootstrap()
