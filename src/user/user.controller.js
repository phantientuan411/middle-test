import bcrypt from 'bcryptjs'
import UserModel from "./user.model.js";
import { v4 } from 'uuid';

const registerUser = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const findUser = await UserModel.find({ email: body.email });
        if (findUser.length > 0) {
            return res.status(400).send({
                message: "email already exist"
            })
        }
        if (!body.userName || !body.email || !body.password) {
            return res.status(400).send({
                message: " need fully inform",
            })
        }
        const hasPassword = bcrypt.hashSync(body.password).toString();
        body.password = hasPassword;
        console.log(hasPassword);

        const user = await UserModel.create(body);
        res.status(200).send({
            data:
            {
                ...user,
                password: hasPassword
            },
            message: "success"
        })


    } catch (error) {
        res.status(500).send(error.message);

    }

}
const login = async (req, res) => {
    try {
        const body = req.body
        if (!body.email || !body.password) {
            return res.status(400).send({
                message: "need fully inform"
            })
        }
        const findUser = await UserModel.findOne({ email: body.email })
        if (!findUser) {
            return res.status(400).send({
                message: "user not exist"
            })
        }

        const comparePassword = bcrypt.compareSync(body.password, findUser.password)
        if (!comparePassword) {
            return res.status(400).send({
                message: "password is wrong"
            })
        }
        const newApiKey = `mern-$${findUser.id}$-$${findUser.email}$-$${v4()}-}$`

        const userApiKey = await UserModel.findByIdAndUpdate(findUser.id,
            {
                apiKey: newApiKey
            },
            {
                new: true
            })
        
        res.status(200).send({
            message: "success",
            data: { 
                userName: findUser.userName,
                email: findUser.email,
                apiKey: userApiKey.apiKey
             }
        })

    } catch (error) {
        res.status(500).send(error.message);
    }

}
export {
    registerUser,
    login
}