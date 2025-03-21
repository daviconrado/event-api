import {Router} from "express";
import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();
const usersController = new UsersController();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @openapi
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
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
usersRoutes.post("/register", usersController.register);

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Authenticate user
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
usersRoutes.post("/login", usersController.login);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
usersRoutes.get("/:id", usersController.show);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/validations/zod-schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
usersRoutes.put("/:id", usersController.update);


export {usersRoutes}