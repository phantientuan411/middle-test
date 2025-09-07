import express from 'express';
import { createPost,updatePost, deletePost } from './post.controller.js';
const postRouter = express.Router();

postRouter.post('/',createPost);
postRouter.put('/:id',updatePost);
postRouter.delete('/delete/:id',deletePost);

 export default postRouter;