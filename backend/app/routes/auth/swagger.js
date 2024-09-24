/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User authentication
 *     tags: ['Auth']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: here9@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: logged In.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: User token.
 *                   example: xxxxxxxx
 */
