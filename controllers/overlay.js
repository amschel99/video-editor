// Import required modules
import { spawn,exec } from 'child_process';
import { mkdirSync } from 'fs';
import multer from 'multer';
import { Worker } from 'worker_threads';
import { createReadStream } from 'fs';
import fs from "fs"

export const overlay = async (req, res) => {
 
  let videoWidth=0
  let imageWidth=0
  let videoHeight=0
  let imageHeight=0
  let videoDuration;
  const {x_offset, y_offset, start_time, end_time}=req.query
  let max_x;
  let max_y;



try{

 

  fs.readdir('./uploads', (err, files) => {
    if (err) throw err;
  
    const videoFile = files.find(file => file.startsWith('0-'));
    const imageFile = files.find(file => file.startsWith('overlay-'));
    if(!videoFile || !imageFile){
      return res.status(400).json(`a resource is missing`)
    }
  
    const videoPath = `./uploads/${videoFile}`;
    const imagePath = `./uploads/${imageFile}`;
    const outputPath=`./outputs/output.mp4`
  
    console.log('Video Path:', videoPath);
    console.log('Image Path:', imagePath);
 
  


  
    
    function getDim () {
      return new Promise((resolve, reject) => {
       const worker=new Worker("./workers/boundaries.js")
    


     worker.postMessage({imagePath,videoPath});
    
      
       worker.on("error",(err)=>console.log(err))
       worker.on('message',(message)=>{
const {status,data}=message
if(status==="ERR"){
  reject(status)

}

const {max_x,max_y}=data
resolve([max_x,max_y])
     })
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
    `overlay=${x_offset}:${y_offset}`,

    
   
    outputPath,
  ];
  const start=Number(start_time)
  const end= Number(end_time)
  const args2 = [
    '-i', `${videoPath}`,
    '-i', `${imagePath}`,
    '-filter_complex', `[0:v][1:v]overlay=${x_offset}:${y_offset}:enable='between(t,${start},${end})'[out]`,
    '-map', '[out]',
    `${outputPath}`
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



    async function createOutputsDirectory() {
      try {
        await fs.promises.mkdir('./outputs');
      } catch (err) {
        if (err.code !== 'EEXIST') {
          console.error('Failed to create outputs directory', err);
          process.exit(1);
        }
      }
    }
    
    // Call the function
    createOutputsDirectory()
      .then(() =>{
        const ffmpegProcess = spawn('ffmpeg', args2);
        ffmpegProcess.stdout.on('data', (data) => {
          console.log(`processing your video.....${data}`)
         });
         ffmpegProcess.stderr.on('data', (data) => {
          console.error(`ffmpeg stderr error ${data}`);
        });

    ffmpegProcess.on('close', (code) => {
      console.log(`ffmpeg process exited with code ${code}`);

      // Stream the processed video to the user
      const fileStream = createReadStream(outputPath);
      fileStream.pipe(res);
    });
     
      })
      .catch((err) => console.error('Failed to create outputs directory', err));
    

    

    

  } catch (e) {
    console.error('Error occurred: ', e);
    return res.status(500).json({ message: 'Failed to process video.' });
  }
})  
    


});
}


catch(e){
return res.status(500).send(`internal server error ${e.message}`)
}
};
