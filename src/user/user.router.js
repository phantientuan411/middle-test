import express from 'express';
const userRouter = express.Router();
import {registerUser, login}  from './user.controller.js'

userRouter.post('/register',registerUser);
userRouter.post('/login',login);
export default userRouter;