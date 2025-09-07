import { Query } from "mongoose";
import PostModel from "./post.model.js";
import UserModel from "../user/user.model.js";
import { v4 } from 'uuid';

const createPost = async (req, res) => {
    try {
        const apiRequest = req.query.apiKey
        const body = req.body
        const findUser = await UserModel.findOne({ apiKey: apiRequest })
        if (!findUser) {
            return res.status(400).send({
                message: "user not login"
            })
        }
        const checkUserId = await UserModel.findById({ _id: body.userId })
        if (!checkUserId) {
            res.status(404).send({
                message: "user not found"
            })
        }

        else if (!body.content || !body.userId) {
            res.status(404).send({
                message: "content and userId is required"
            })
        }
        console.log(checkUserId);
        const newPost = await PostModel.create({
            userId: findUser.id,
            content: body.content
        })
        res.status(200).send({
            message: "success",
            data: newPost
        })


    } catch (error) {
        res.status(500).send(error.message);
    }
}
const updatePost = async (req, res) => {
    try {
        const apiRequest = req.query.apiKey
        console.log(apiRequest);
        
        const body = req.body
        console.log(body);
        const findUser = await UserModel.findOne({ apiKey: apiRequest })
        console.log(findUser);
        
        if (!findUser) {
            return res.status(400).send({
                message: "user not login"
            })
        }
        const checkPostId = await PostModel.findById(req.params.id )
        console.log(checkPostId);
        
        if (!checkPostId) {
            res.status(404).send({
                message: "post not found"
            })
        }
        const newContent = body.content;
        console.log(newContent);
        
        if(!newContent){
            res.status(404).send({
                message: "new content is required"
            })
        }
        const updatePost = await PostModel.findByIdAndUpdate(req.params.id, { content: newContent },{new: true})
        res.status(200).send({
            message: "success",
            data: updatePost
        })

    } catch (error) {
        res.status(500).send(error.message);

    }
}
const deletePost = async (req, res) => {
    try {
        const apiRequest = req.query.apiKey
        const body = req.body     
        const findUser = await UserModel.findOne({ apiKey: apiRequest })        
        if (!findUser) {
            return res.status(400).send({
                message: "user not login"
            })
        }
        const checkPostId = await PostModel.findById(req.params.id )        
        if (!checkPostId) {
            res.status(404).send({
                message: "post not found"
            })
        }
        const deletePost = await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            message: "success",
            data: deletePost
        })
    }   
    catch{
        res.status(500).send(error.message);
    }
}    
export {
    createPost,
    updatePost,
    deletePost
}