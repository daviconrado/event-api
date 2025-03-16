import {Router} from "express";
import { TicketsController } from "../controllers/TicketsController";

const ticketsRoutes = Router();
const ticketsController = new TicketsController();

ticketsRoutes.post("",ticketsController.create) //comprar ingresso
ticketsRoutes.get("/user/:userId",ticketsController.index) //listar ingressos do usuario
ticketsRoutes.get("/:id",ticketsController.show) //detalhes do ingresso
ticketsRoutes.put("/:id/validate",ticketsController.update) //validar ingresso
ticketsRoutes.delete("/:id",ticketsController.remove) //deletar ingresso

export{ticketsRoutes}