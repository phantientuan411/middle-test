import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    creatAtDate: {
        type: Date,
        default: Date.now,
    },
    upDateAtDate: {
        type: Date,
        default: Date.now,
    },

});
const PostModel = mongoose.model('\post', postSchema)
export default PostModel