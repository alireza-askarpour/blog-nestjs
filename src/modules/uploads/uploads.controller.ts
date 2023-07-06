import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { UploadsService } from './uploads.service'
import { postFilter } from './filters/post.filter'
import { postStorage } from './upload.storages'
import { ApiFile } from '../../shared/decorators/api-file.decorator'

@ApiTags('Upload File')
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {
  constructor(private uploadService: UploadsService) {}

  @ApiOperation({
    summary: 'upload a photo for post',
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiConsumes('multipart/form-data')
  @ApiFile('thumbnail')
  @Post('posts')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: postStorage(),
      fileFilter: postFilter,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.upload(file)
  }
}
