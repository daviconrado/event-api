import {Router} from "express";
import { EventsController } from "../controllers/EventsController";

const eventsRoutes = Router();
const eventsController = new EventsController();

eventsRoutes.get("",eventsController.index)
eventsRoutes.get("/:id",eventsController.show)
eventsRoutes.post("",eventsController.create)
eventsRoutes.put("/:id",eventsController.update)
eventsRoutes.delete("/:id",eventsController.remove)


export{eventsRoutes}