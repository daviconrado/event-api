import {Router} from "express";
import { UsersController } from "../controllers/UsersController";
import { checkRoles } from "../middlewares/check-role";
import { EventsController } from "../controllers/EventsController";

const publicRoutes = Router();
const usersController = new UsersController();
const eventsController = new EventsController();

/**
 * @openapi
 * tags:
 *   name: Public 
 *   description: Public events management endpoints
 */

/**
 * @openapi
 * /public/events:
 *   get:
 *     tags: [Public]
 *     summary: List all events
 *     security: []
 *     responses:
 *       200:
 *         description: Listing all events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Events not found
 */
publicRoutes.get("/events",eventsController.index)
/**
 * @openapi
 * /public/events/{id}:
 *   get:
 *     tags: [Public]
 *     summary: Show a event
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event showed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Bad request syntax"
 */
publicRoutes.get("/events/:id",eventsController.show)

/**
 * @openapi
 * /public/register:
 *   post:
 *     tags: [Public]
 *     summary: Register a new user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Bad request syntax"
 */
publicRoutes.post("/register", usersController.register);

/**
 * @openapi
 * /public/login:
 *   post:
 *     tags: [Public]
 *     summary: Authenticate user
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: "jwt.token.here"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Email or password is incorrect"
 */
publicRoutes.post("/login", usersController.login);

export {publicRoutes}