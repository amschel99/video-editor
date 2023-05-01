import multer from 'multer';
import path from 'path'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    console.log(req.query)
    let   newFilename = `${req.query.fileIntent}-${ext}`;
console.log(ext)
    console.log("its"+JSON.stringify(req.body))
    cb(null, newFilename);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: Infinity,
  },
}).single('file');


