// import {} from "dotenv/config.js";// const express = require("express");
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
  });

const port = process.env.PORT || 5500;

connectDB()
.then(()=>{
    app.on("error", (error)=>{
        console.log("Error:", error);
        throw error
    })

    app.listen(port || 8848, ()=>{
        console.log(`Server Is Listening At: http://localhost:${port}`
        );
    })
})
.catch((error)=> {
    console.log("Mongo Database connection failed", error);
})

