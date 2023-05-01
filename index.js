import express from 'express'
import { overlay } from './controllers/overlay.js'
import { upload } from './controllers/upload.js'
const app=express()

app.get("/",()=>{
    res.json('hello world')
})

app.post("/upload",upload)
app.post("/overlay",overlay)

app.listen(5500, ()=>{
    console.log("server listening")
})