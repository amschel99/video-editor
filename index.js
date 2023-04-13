import express from 'express'
import { overlay } from './controllers/overlay.js'
const app=express()


app.post("/",overlay)
app.listen(5500, ()=>{
    console.log("server listening")
})