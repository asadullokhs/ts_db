import {  Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import User from "../model/userModel";

const reportedError = (obj: {message : string}, res: Response)=> {
  res.status(503).json({message: obj.message})
}

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";

const userCtrl = {
   signUp : async (req: Request, res: Response) => {
    try {
        const {email, name, password} = req.body;        

        if(!email || !name || !password){
          return  res.status(403).json({message: "Please fill all gaps!"});
        }; 

        const checkUser = await User.exists({email})

        if(checkUser){
            return res.status(401).json({message:"This email is iterrable!"})
        }

        const hashdedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({name, email, password: hashdedPassword});
        
        await newUser.save()

        const token = await JWT.sign({id: newUser._id, name: newUser.name, email: newUser.email}, JWT_SECRET_KEY)

        res.status(201).json({message:"Successfully registered!", user: newUser, token})
    } catch (error: object | unknown) {
      console.error(error);
      
      if(error instanceof Error){
          reportedError(error, res)
      }
    }
   },
   login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
          return res.status(404).json({ message: "User not found" });
        }

        
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          oldUser.password
        );
        if (!isPasswordCorrect) {
          return res
            .status(400)
            .json({ message: "Email or password is incorrect" });
        }

        const token = JWT.sign(
          { email: oldUser.email, _id: oldUser._id },
          JWT_SECRET_KEY
        );

        const user = {
            _id: oldUser._id,
            email: oldUser.email,
            name: oldUser.name,
            createdAt: oldUser.createdAt,
            updatedAt: oldUser.updatedAt,
        }
        

        res
          .status(200)
          .send({ message: "Login successfully", user, token });
      } else {
        res.status(403).send({ message: "Please fill all fields" });
      }
    } catch (error: object | unknown) {
      console.error(error);
      
      if(error instanceof Error){
          reportedError(error, res)
      }
    }
   }
}

export default userCtrl