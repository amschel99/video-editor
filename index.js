import express from 'express'
import { overlay } from './controllers/overlay.js'
import { uploadMainVideo} from './controllers/upload.js'
import { uploadResourceFile } from './helpers/resourceUpload.js'
import bodyParser from 'body-parser'
const app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/upload/resource",uploadResourceFile)
app.post("/upload/main",uploadMainVideo)
app.post("/overlay",overlay)

app.listen(5500, ()=>{
    console.log("server listening")
})