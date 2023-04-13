import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: Infinity,
  },
}).array('files', 2);
