import {Router} from "express";
import { TicketsController } from "../controllers/TicketsController";
import { authMiddleware } from "../middlewares/auth-middleware";

const ticketsRoutes = Router();
const ticketsController = new TicketsController();

ticketsRoutes.post("",ticketsController.create) 
ticketsRoutes.get("/user/:userId",ticketsController.index) 
ticketsRoutes.get("/:id",ticketsController.show) 
ticketsRoutes.patch("/:id",authMiddleware,ticketsController.update)
ticketsRoutes.delete("/:id",ticketsController.remove)

export{ticketsRoutes}