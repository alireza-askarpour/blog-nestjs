import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme } from 'swagger-themes'

export class DocumentConfig {
  constructor(private app: INestApplication) {}

  setupSwagger(): this {
    const config = new DocumentBuilder()
      .setTitle('Blog NestJs')
      .setDescription('The Blog Web API using NestJs, MongoDB and GraphQL')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        name: 'Authorization',
      })
      .build()
    const document = SwaggerModule.createDocument(this.app, config)
    const theme = new SwaggerTheme('v3')
    const options = {
      explorer: true,
      customCss: theme.getBuffer('dark'),
    }
    SwaggerModule.setup('api-docs', this.app, document, options)
    return this
  }
}
