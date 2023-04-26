import express from 'express'
import { overlay } from './controllers/overlay.js'
const app=express()

app.get("/",()=>{
    res.json('hello world')
})
app.post("/overlay",overlay)
app.listen(5500, ()=>{
    console.log("server listening")
})