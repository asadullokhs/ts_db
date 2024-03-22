import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cors from "cors"
import { connectDb } from "./config/db";

dotenv.config()

import userRouter from "./router/userRouter"

const app : Application = express()

// middlewear 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(fileUpload())

app.get('/', (req: Request, res: Response)=> {
   res.send("ok")
})

const PORT: number | string = process.env.PORT || 4002;

//routes
app.use("/api", userRouter)

const MONGO_URL: string = process.env.MONGO_URL || "";

const start = async () :Promise<void> => {
    try {
        await connectDb(MONGO_URL)
        app.listen(PORT, ():void => console.log(`Server started at ${PORT} port...`))
    } catch (error) {
        console.error(error);
    }
}

start();