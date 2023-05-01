import multer from 'multer';
import path from 'path'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const newFilename = `${getFileIndex()}-${file.originalname}`;
    cb(null, newFilename);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: Infinity,
  },
}).single('video');

let fileIndex = 0;
const getFileIndex = () => fileIndex++;
