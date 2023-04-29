import {exec} from "child_process"


export const calculateDuration=  (filePath)=>{
  return new Promise((resolve, reject)=>{

exec(`ffprobe -i ${filePath} -show_entries format=duration -v quiet -of csv="p=0"`, (err,stdout,stdout)=>{
    if (err) {
        console.error(`Error executing command: ${err}`);
        reject(err);
      }
      const duration = parseFloat(stdout);
      console.log(duration)
resolve(duration)
})


  })
}