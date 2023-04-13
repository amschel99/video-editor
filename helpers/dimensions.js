import { exec } from 'child_process';

export const calculateDimensions = (filePath) => {
  return new Promise((resolve, reject) => {
    exec(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of default=noprint_wrappers=1:nokey=1 ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing command: ${err}`);
        reject(err);
      }
      
      // Parse the output to get the video dimensions
      const dimensions = stdout.trim().split('\n');
      const fileWidth = Number(dimensions[0]);
      const fileHeight = Number(dimensions[1]);
      
      console.log([fileWidth, fileHeight]);
      resolve([fileWidth, fileHeight]);
    });
  });
};
