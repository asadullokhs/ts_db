import mongoose from "mongoose";
import { IUser } from "../config/interfaces";

const userSchema = new mongoose.Schema(
    {
       name: {
        type: String,
        required : true,
       },
       email:{
        type: String,
        required: true,
       },
       password:{
        type: String,
        required: true,
       },
       phone: {
        type: String
       }
    },
    {
        timestamps: true,
    }
)


export default mongoose.model<IUser>("Users", userSchema)