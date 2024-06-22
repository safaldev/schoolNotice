import express from "express";
import cors from 'cors';
import noticeRouter from './routes/notice.routes.js'
import { Notice } from "./models/notice.models.js";
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ 
    extended: true,
    limit: 16000,
    parameterLimit: 2,
}))

// routes 

let noticeData ;
async function dataCollector(){
 noticeData = await Notice.find();
//  console.log(noticeData);
}

dataCollector()

// routes decleration
app.use("/api/v1/notice", noticeRouter)


app.get('/', (req, res) => {
    res.json("Vercel Working")
})

app.get('/api/v1/noticeData', (req, res) => {
            dataCollector()
            res.send(noticeData)
})

// user routes
// app.use("/api/v1/users", userRoutes)
app.use("/api/v1/login", authRoutes)


export {app , dataCollector}
