import { uploadFiles } from '../helpers/upload.js';

export const upload= async (req,res)=>{
    try{
        const {uploadStatus,uploadData}= await uploadFiles(req,res)

        const{videoPath, imagePath,outputPath}=uploadData
        res.json({videoPath,imagePath,outputPath})
    }
    catch(err){
res.json(err.message)
    }
}
