import { diskStorage } from 'multer';

export const storagePath = "tmp/uploads";

export const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + file.originalname)
  }
})