import {Router} from "express";
import { EventsController } from "../controllers/EventsController";
import { authMiddleware } from "../middlewares/auth-middleware";
import { checkRoles } from "../middlewares/check-role";

const eventsRoutes = Router();
const eventsController = new EventsController();

/**
 * @openapi
 * tags:
 *   name: Events
 *   description: Events management endpoints
 */

eventsRoutes.post("", checkRoles(["admin"]),eventsController.create)
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
eventsRoutes.put("/:id", checkRoles(["admin"]),eventsController.update)
/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Delete a event
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
eventsRoutes.delete("/:id", checkRoles(["admin"]),eventsController.remove)


export{eventsRoutes}