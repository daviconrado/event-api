import { NextFunction, Request, Response  } from "express"
import { userSchemaZod, loginSchemaZod } from "../validations/zod-schemas/user-schema-zod"
import Users from "../models/UserModel"
import { AppError } from "../utils/AppError"
import { comparePasswords } from "../utils/hash-utils"
import { userUpdateSchema } from "../validations/zod-schemas/update-schema-zod"
const jwt = require('jsonwebtoken')
require('dotenv').config();

export class UsersController{
    async register(req: Request, res: Response, next: NextFunction){
        try {
            const validatedZodData = userSchemaZod.parse(req.body)
            const user = new Users(validatedZodData)
            await user.save()
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const validatedZodData = loginSchemaZod.parse(req.body)
            const {email,password}= validatedZodData;

            const user = await Users.findOne({email:email}).exec();

            if(!user){
                next(new AppError("User not found",404));
                return;
            }

            const isPasswordValid = await comparePasswords(password,user.password as string)

            if(!isPasswordValid){
                next(new AppError("Email or password is incorrect",401));
                return;
            }

            const {_id,role} = user
            const token = jwt.sign({_id, role},process.env.JWT_SECRET,{expiresIn:'1h'})
            res.status(200).json({token})

        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params
            const validatedZodData = userUpdateSchema.parse(req.body)
            await Users.updateOne({_id:id},validatedZodData)
    
            const event = await Users.findById(id);
            res.status(200).json(event)
        } catch (error) {
            next(error)
        } 
    }

    async show(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params
            const events = await Users.findById(id);
    
            if(JSON.stringify(events)==="null"){
                next(new AppError("User not found",404));
                return;
            }
    
            res.status(200).json(events);
        } catch (error : any) {
            next(new AppError("",404));
        }
    }

    async remove(req: Request, res: Response,next: NextFunction){
        try {
            const {id} = req.params
            const events = await Users.deleteOne({_id:id});
            res.status(204).json(events);
        } catch (error : any) {
            next(new AppError(error.message));
        }
       }

    async admin(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            await Users.updateOne({_id:id},{role:"admin"})
            res.status(204);
        } 
        catch (error : any) {
            next(new AppError(error.message));
        }
    }
}