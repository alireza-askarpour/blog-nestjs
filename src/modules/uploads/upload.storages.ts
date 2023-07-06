import * as path from 'path'
import { promises } from 'fs'
import { diskStorage } from 'multer'
import {
  alphabetLetters,
  alphabetNumber,
  nanoid,
} from 'src/shared/utils/nanoid.util'

export function postStorage() {
  return diskStorage({
    destination: async function (req, file, cb) {
      const path = `./uploads/posts`

      try {
        const state = await promises.stat(path)
        if (!state.isDirectory()) {
          await promises.mkdir(path)
        }
      } catch (error) {
        await promises.mkdir(path)
      } finally {
        cb(null, path)
      }
    },
    filename: function (req, file, cb) {
      const filename = nanoid(alphabetNumber + alphabetLetters, 16)
      const extname = path.extname(file.originalname)
      cb(null, filename + extname)
    },
  })
}
