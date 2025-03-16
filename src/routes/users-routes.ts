import {Router} from "express";
import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/register",usersController.register) 
usersRoutes.post("/login",usersController.login) 
usersRoutes.get("/:id",usersController.show) 
usersRoutes.put("/:id",usersController.update)

export{usersRoutes}