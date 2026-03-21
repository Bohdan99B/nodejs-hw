import multer from 'multer';
import createHttpError from 'http-errors';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      callback(createHttpError(400, 'Only images allowed'));
      return;
    }

    callback(null, true);
  }
});
