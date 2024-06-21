import { Router } from "express";
import { validate, User } from "../models/user.models.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async(req, res) => {
    try {
        const {error} = validate(req.body)

        if(error)
            return res.status(400).send({message: error.details[0].message})
        
        const user = await User.findOne({username: req.body.username})

        if(user)
            return res.status(409).send({message: "User already exists with same username"})
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password:hashPassword}).save();
        res.status(201).send({message: "User Created Sucessfully"})

    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

export default router;