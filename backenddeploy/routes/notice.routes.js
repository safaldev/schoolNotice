import { Router } from "express";
import { addNotice } from "../controller/notice.controller.js";

const router = Router();

router.route("/add").post(

    addNotice
)


export default router;