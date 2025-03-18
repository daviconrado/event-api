import { NextFunction, Request, Response  } from "express"
import { userSchemaZod, loginSchemaZod } from "../models/zod-schemas/user-schema-zod"
import Users from "../models/UserModel"
import { AppError } from "../utils/AppError"
import { comparePasswords } from "../utils/hashUtils"

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

            const data = await Users.find({email:email}).exec();

            if(!data || data.length===0){
                next(new AppError("",404));
                return;
            }

            const passwordHash = data[0].password as string;
            const loginFlag = await comparePasswords(password,passwordHash)

            if(!loginFlag){
                next(new AppError("Email or password is incorrect",404));
                return;
            }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params
            await Users.updateOne({_id:id},req.body)
    
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
                next(new AppError("",404));
                return;
            }
    
            res.status(200).json(events);
        } catch (error : any) {
            next(new AppError("",404));
        }
    }
}