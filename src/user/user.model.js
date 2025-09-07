import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    apiKey:String,
});
const UserModel = mongoose.model('user',userSchema)
export default UserModel