import { Router } from "express"
import { eventsRoutes } from "./events-routes"
import { ticketsRoutes } from "./tickets-routes"
import { usersRoutes } from "./users-routes"
import { authMiddleware } from "../middlewares/auth-middleware"
import { publicRoutes } from "./public-routes"

const routes = Router()

routes.use("/public",publicRoutes)

routes.use(authMiddleware)

routes.use("/events",eventsRoutes)
routes.use("/tickets",ticketsRoutes)
routes.use("/users",usersRoutes)

export {routes}