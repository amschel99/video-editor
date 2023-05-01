import { upload } from './resources-upload-helper.js';

let resourceFilePath;


export const uploadResourceFile = async (req, res) => {
  try {
    // Wrap the upload function inside a Promise
    const uploadPromise = new Promise((resolve, reject) => {
      upload(req, res, async function (err) {
        if (err) {
          // Handle any error occurred while receiving the files
          console.log('Error occurred while uploading file: ', err);
          reject(err);
        }
  
        console.log(JSON.stringify(req.file))
        resourceFilePath = `./uploads/${req.file.filename}`;
        
   
        resolve({ uploadStatus: "OK", uploadData: { resourceFilePath } });
      });
    });

    // Wait for the uploadPromise to resolve and return the result
    return await uploadPromise;
  } catch (err) {
    return err;
  }
};
