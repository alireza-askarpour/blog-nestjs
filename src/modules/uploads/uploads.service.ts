import { mkdir, stat } from 'fs/promises'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ResponseMessages } from 'src/shared/constants/response-messages.constant'

@Injectable()
export class UploadsService {
  async upload(file: Express.Multer.File) {
    if (!file) throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED)
    console.log(file)

    const path = `./uploads/posts`
    const state = await stat(path)

    if (!state.isDirectory()) {
      await mkdir(path)
    }

    return file.filename
  }
}
