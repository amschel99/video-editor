import {spawn} from "child_process"
import fs from 'fs'
const validPositions=['br','bl','tl','tr']
export const watermark= async (req,res)=>{

    try{
const {position}=req.query
if (!validPositions.includes(position)) {
    return res.status(400).json({
      message: "Invalid watermark position",
    });
  }
  



    }catch(e){

    }
}