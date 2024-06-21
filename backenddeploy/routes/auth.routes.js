import Joi from "joi";
import { Router } from "express";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
const router = Router();

router.post("/", async (req, res) => {
	console.log(req.body);
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ username: req.body.username });
		if (!user)
			return res.status(401).send({ message: "Invalid username or Password" });

		const validPassword =await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid username or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

export default router;
