import { calculateDimensions } from '../helpers/dimensions.js';
import {parentPort} from 'worker_threads'
parentPort.on('message',(message)=>{
    const {imagePath, videoPath}=message
Promise.all(

    [calculateDimensions(imagePath),calculateDimensions(videoPath)]
).then((dimensions)=>{

    const [imageDimensions, videoDimensions] = dimensions;
    const videoWidth = videoDimensions[0];
          const videoHeight = videoDimensions[1];
          const imageWidth = imageDimensions[0];
          const imageHeight = imageDimensions[1];
          const max_x = videoWidth - imageWidth;
          const max_y = videoHeight - imageHeight;
          parentPort.postMessage({status:"OK",data:{max_x,max_y}})

}).catch((error)=>{
parentPort.postMessage({status:"Err",data:null})
})


})