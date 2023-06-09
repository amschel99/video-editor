import { upload } from './file-upload-helper.js';

let videoPath;
const outputPath = './outputs/output.mp4';

export const uploadVideo = async (req, res) => {
  try {
    // Wrap the upload function inside a Promise
    const uploadPromise = new Promise((resolve, reject) => {
      upload(req, res, async function (err) {
        if (err) {
          // Handle any error occurred while receiving the files
          console.log('Error occurred while uploading file: ', err);
          reject(err);
        }
  
        // Define the input and output file paths
        videoPath = `./uploads/${req.file.filename}`;
   
        resolve({ uploadStatus: "OK", uploadData: { videoPath, outputPath } });
      });
    });

    // Wait for the uploadPromise to resolve and return the result
    return await uploadPromise;
  } catch (err) {
    return err;
  }
};
