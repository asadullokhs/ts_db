import {Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}