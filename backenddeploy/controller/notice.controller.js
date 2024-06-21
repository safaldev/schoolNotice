import { Notice } from '../models/notice.models.js'
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const addNotice = asyncHandler(async (req, res) => {

const {title, message} = req.body;

const existedNotice = await Notice.findOne({
    $or: [{ title }],
});

if (existedNotice) {
    throw new ApiError(409, "User with email or username already exists");
}

const notice = await Notice.create({
    title,
    message,
});


const createdNotice = await Notice.findById(notice._id).select();

console.log(createdNotice);
})


export { addNotice };