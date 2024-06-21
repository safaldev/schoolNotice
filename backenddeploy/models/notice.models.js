import mongoose, {Schema} from "mongoose";


const noticeSchema = new Schema( {
    title: {
        type: String,
    },
    message: {
        type: String,
    }
},
{
    timestamps: true
})

export const Notice = mongoose.model('Notice', noticeSchema)