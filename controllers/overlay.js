// Import required modules
import { spawn,exec } from 'child_process';
import { mkdirSync } from 'fs';
import multer from 'multer';
import { createReadStream } from 'fs';
import { calculateDimensions } from '../helpers/dimensions.js';
import { upload } from '../helpers/file-upload.js';
// Define input and output file paths
export const overlay = async (req, res) => {
  let videoWidth=0
  let imageWidth=0
  let videoHeight=0
  let imageHeight=0
  const {x_offset, y_offset}=req.query
  let max_x;
  let max_y;



try{



  // Call the multer instance to receive the video file from the user
  upload(req, res, async function (err) {
    if (err) {
      // Handle any error occurred while receiving the video file
      console.log('Error occurred while uploading file: ', err);
      return res.status(500).json({ message: 'Failed to upload file.' });
    }

    // Define the input and output file paths
    const videoPath = `./uploads/${req.files[0].filename}`;
    const imagePath = `./uploads/${req.files[1].filename}`
    const outputPath = './outputs/output.mp4';
    function getDim () {
      return new Promise((resolve, reject) => {
        Promise.all([
          calculateDimensions(videoPath),
          calculateDimensions(imagePath)
        ]).then((dimensions) => {
          const [videoDimensions, imageDimensions] = dimensions;
          const videoWidth = videoDimensions[0];
          const videoHeight = videoDimensions[1];
          const imageWidth = imageDimensions[0];
          const imageHeight = imageDimensions[1];
          const max_x = videoWidth - imageWidth;
          const max_y = videoHeight - imageHeight;
          resolve([max_x, max_y]);
        }).catch((e) => {
          reject(e);
        });
      });
    }
getDim().then((data)=>{
  const max_x=data[0]
  const max_y=data[1]
  console.log(max_x)
  console.log(max_y)
  if(x_offset>max_x){
    return res.status(400).json(`max  x offset exceeded, x_offset should be below ${max_x}`)
  }
  if(y_offset>max_y){
    return res.status(400).json(`max y offset exceeded, y_offset should be below ${max_y}`)
  }
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
     console.log(`processing your video.....`)
    });

    ffmpegProcess.stderr.on('data', (data) => {
      console.error(`ffmpeg stderr error encountered but still processing...`);
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
})  
    


  });
}
catch(e){

}
};
