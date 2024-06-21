import jwt from 'jsonwebtoken';
import Joi from 'joi';
import mongoose , {Schema} from 'mongoose';
import passwordComplexity from "joi-password-complexity"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            require: true,
        },
    },
    {
        timestamps: true
    }
)

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})
    return token
};

const User = mongoose.model("User", userSchema)

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        password: passwordComplexity().required().label("Pasword")
    })

    return schema.validate(data)
}

export {User, validate}
