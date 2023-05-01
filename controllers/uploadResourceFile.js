import {uploadResourceFile} from "../helpers/resourceUpload.js"

export const uploadMainVideo= async (req,res)=>{
    try{
        const {uploadStatus,uploadData}= await uploadResourceFile(req,res)

        const{resourceFilePath}=uploadData
        res.json({resourceFilePath})
    }
    catch(err){
res.json(err.message)
    }
}
