import {Router} from "express";
import { EventsController } from "../controllers/EventsController";
import { authMiddleware } from "../middlewares/auth-middleware";

const eventsRoutes = Router();
const eventsController = new EventsController();

/**
 * @openapi
 * tags:
 *   name: Events
 *   description: Events management endpoints
 */
eventsRoutes.get("",eventsController.index)
/**
 * @openapi
 * /events:
 *   get:
 *     tags: [Events]
 *     summary: List all events
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
eventsRoutes.get("/:id",eventsController.show)
/**
 * @openapi
 * /events:
 *   post:
 *     tags: [Events]
 *     summary: Create a event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
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
eventsRoutes.post("",authMiddleware,eventsController.create)
/**
 * @openapi
 * /events:
 *   put:
 *     tags: [Events]
 *     summary: Update a event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event updated successfully
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
eventsRoutes.put("/:id",eventsController.update)
/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Delete a event
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
eventsRoutes.delete("/:id",eventsController.remove)


export{eventsRoutes}