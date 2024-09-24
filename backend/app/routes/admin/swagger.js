/**
 * @swagger
 *
 * /api/v1/admin/user:
 *   get:
 *     summary: Get all User
 *     tags: ['Admin']
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         type: number
 *         description: Pagination page number.
 *         example: 1
 *
 *       - name: limit
 *         in: query
 *         type: number
 *         description: Pagination record limit.
 *         example: 10
 *     responses:
 *       200:
 *         description: Get all User Data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: The user ID.
 *                             example: xxxxxxxx
 *                           email:
 *                             type: string
 *                             description: The user's email.
 *                             example: test@gmail.com
 *                           name:
 *                             type: string
 *                             description: The user's name.
 *                             example: Leanne Graham
 *                           status:
 *                             type: string
 *                             description: The user's status.
 *                             example: active|inactive
 *                     totalDocs:
 *                       type: number
 *                     limit:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     page:
 *                       type: number
 *                     pagingCounter:
 *                       type: number
 *                     hasPrevPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *                     prevPage:
 *                       type: number
 *                       nullable: true
 *                     nextPage:
 *                       type: number
 *                       nullable: true
 *   post:
 *     summary: Create New User
 *     tags: ['Admin']
 *     security:
 *       - bearerAuth: []
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
 *                 example: here@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 123456
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: Tester
 *               status:
 *                 type: string
 *                 description: The user's status.
 *                 example: active|inactive
 *     responses:
 *       200:
 *         description: A new user has been successfully added.
 *   put:
 *     summary: User Profile update
 *     tags: ['Admin']
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user's ID.
 *                 example: xxxxxxxx
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: Tester
 *               status:
 *                 type: string
 *                 description: The user's status.
 *                 example: active|inactive
 *
 *     responses:
 *       200:
 *         description: User updated successfully.
 *   delete:
 *     summary: User delete account
 *     tags: ['Admin']
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user's ID.
 *                 example: xxxxxxxx
 *     responses:
 *       200:
 *         description: User updated successfully.
 *
 *
 * /api/v1/admin/get-single-user:
 *   post:
 *     summary: Get single user by Id
 *     tags: ['Admin']
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user's ID.
 *                 example: xxxxxxxx
 *     responses:
 *       200:
 *         description: Get single User Data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The user ID.
 *                       example: xxxxxxxx
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: test@gmail.com
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     type:
 *                       type: string
 *                       description: The user's type.
 *                       example: user
 *                     status:
 *                       type: string
 *                       description: The user's status.
 *                       example: active|inactive
 */
