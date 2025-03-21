import {Router} from "express";
import { TicketsController } from "../controllers/TicketsController";
import { authMiddleware } from "../middlewares/auth-middleware";

const ticketsRoutes = Router();
const ticketsController = new TicketsController();

/**
 * @openapi
 * tags:
 *   name: Tickets
 *   description: Tickets management endpoints
 */
/**
 * @openapi
 * /tickets:
 *   post:
 *     tags: [Tickets]
 *     summary: Buy a ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Bad request syntax"
 */
ticketsRoutes.post("",ticketsController.create) 
/**
 * @openapi
 * /tickets/{userid}:
 *   get:
 *     tags: [Tickets]
 *     summary: Get user tickets information
 *     responses:
 *       200:
 *         description: Ticket found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Bad request syntax"
 */
ticketsRoutes.get("/user/:userId",ticketsController.index) 
/**
 * @openapi
 * /tickets/{ticketid}:
 *   get:
 *     tags: [Tickets]
 *     summary: Get ticket information
 *     responses:
 *       200:
 *         description: Ticket found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Bad request syntax"
 */
ticketsRoutes.get("/:id",ticketsController.show) 
/**
 * @openapi
 * /tickets/{ticketid}:
 *   patch:
 *     tags: [Tickets]
 *     summary: Update a ticket
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Bad request syntax"
 */
ticketsRoutes.patch("/:id",authMiddleware,ticketsController.update)
/**
 * @openapi
 * /tickets/{ticketid}:
 *   delete:
 *     tags: [Tickets]
 *     summary: Delete a ticket
 *     responses:
 *       204:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 */
ticketsRoutes.delete("/:id",ticketsController.remove)

export{ticketsRoutes}