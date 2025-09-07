import express from 'express';
import mongoose from 'mongoose';
import userRouter from './src/user/user.router.js';
import postRouter from './src/post/post.router.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 8888;
const host ="localhost"
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello world")
})
dotenv.config({ path: '.env.local' });
app.use(`/user`,userRouter)
app.use(`/post`,postRouter)
mongoose
.connect(process.env.uri)
.then((res)=>{
    app.listen(port,host, ()=>{
    console.log(`server is running at http://${host}:${port}/`);
    })
})
.catch((error)=>{
    console.log(error);
})
