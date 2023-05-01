import { uploadVideo } from '../helpers/upload.js';

export const uploadMainVideo= async (req,res)=>{
    try{
        const {uploadStatus,uploadData}= await uploadVideo(req,res)

        const{videoPath,outputPath}=uploadData
        res.json({videoPath,outputPath})
    }
    catch(err){
res.json(err.message)
    }
}
