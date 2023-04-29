import { calculateDuration } from '../helpers/duration.js'
import {parentPort} from 'worker_threads'
parentPort.on('message',(message)=>{
    const { videoPath}=message
Promise.all(

    [calculateDuration(videoPath)]
).then((duration)=>{

    const [time] = duration;
    
   
 

         
          parentPort.postMessage({status:"OK",data:time})

}).catch((error)=>{
parentPort.postMessage({status:"Err",data:null})
})


})