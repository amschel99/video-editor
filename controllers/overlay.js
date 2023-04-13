// Import required modules
import { spawn } from 'child_process';
import { mkdirSync } from 'fs';
import multer from 'multer';
import { createReadStream } from 'fs';

// Define input and output file paths
export const overlay = async (req, res) => {
  // Define the multer storage configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  // Create multer instance with storage configuration
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: Infinity, // Remove the limit on file size
    },
  }).single('file');

  // Call the multer instance to receive the video file from the user
  upload(req, res, function (err) {
    if (err) {
      // Handle any error occurred while receiving the video file
      console.log('Error occurred while uploading file: ', err);
      return res.status(500).json({ message: 'Failed to upload file.' });
    }

    // Define the input and output file paths
    const videoPath = `./uploads/${req.file.filename}`;
    const imagePath = './assets/image.png';
    const outputPath = './outputs/output.mp4';

    // Define the ffmpeg command to run
    const args = [
      '-i',
      videoPath,
      '-i',
      imagePath,
      '-filter_complex',
      'overlay=10:10',
      outputPath,
    ];

    try {
      // Create the output directory if it does not exist
      try {
        mkdirSync('./outputs');
      } catch (err) {
        if (err.code !== 'EEXIST') {
          console.error('Failed to create outputs directory', err);
          process.exit(1);
        }
      }

      // Spawn a child process to run the ffmpeg command
      const ffmpegProcess = spawn('ffmpeg', args);

      // Handle events emitted by the child process
      ffmpegProcess.stdout.on('data', (data) => {
        console.log(`ffmpeg stdout:\n${data}`);
      });

      ffmpegProcess.stderr.on('data', (data) => {
        console.error(`ffmpeg stderr:\n${data}`);
      });

      ffmpegProcess.on('close', (code) => {
        console.log(`ffmpeg process exited with code ${code}`);

        // Stream the processed video to the user
        const fileStream = createReadStream(outputPath);
        fileStream.pipe(res);
      });
    } catch (e) {
      console.error('Error occurred: ', e);
      return res.status(500).json({ message: 'Failed to process video.' });
    }
  });
};
