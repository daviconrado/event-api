import { Router } from "express"
import { eventsRoutes } from "./events-routes"
import { ticketsRoutes } from "./tickets-routes"
import { usersRoutes } from "./users-routes"

const routes = Router()

routes.use("/events",eventsRoutes)
routes.use("/tickets",ticketsRoutes)
routes.use("/users",usersRoutes)

export {routes}