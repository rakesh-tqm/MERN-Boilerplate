/**
 * @swagger
 *
 * /api/v1/user/signup:
 *   post:
 *     summary: User Signup
 *     tags: ['User']
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
 *     responses:
 *       200:
 *         description: A new user has been successfully added.
 *
 *
 * /api/v1/user/forget-password:
 *   post:
 *     summary: User Forget Password
 *     tags: ['User']
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
 *                 example: here4@gmail.com
 *     responses:
 *       200:
 *         description: Reset password link has been sent to your email id.
 *
 *
 * /api/v1/user/reset-password:
 *   post:
 *     summary: User Reset Password
 *     tags: ['User']
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
 *               newPassword:
 *                 type: string
 *                 description: The user's New Password.
 *                 example: 123456
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm Password.
 *                 example: 123456
 *               resetToken:
 *                 type: string
 *                 description: Reset Password Token.
 *                 example: xxxxxxxxxx
 *     responses:
 *       200:
 *         description: Password has been updated successfully.
 *
 * /api/v1/user/confirm-email:
 *   post:
 *     summary: User Email Confirmation
 *     tags: ['User']
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
 *               token:
 *                 type: string
 *                 description: Email Confirmation Token.
 *                 example: xxxxxxxxxx
 *     responses:
 *       200:
 *         description: Email has been confirmed successfully.
 *
 * /api/v1/user/change-password:
 *   put:
 *     summary: User Change Password
 *     tags: ['User']
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The user's Old Password.
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 description: The user's New Password.
 *                 example: 123456
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm Password.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User's password updated successfully.
 *
 *
 * /api/v1/user:
 *   get:
 *     summary: Get User Profile
 *     tags: ['User']
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Single User Data.
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
 *   put:
 *     summary: User Profile update
 *     tags: ['User']
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: Tester
 *     responses:
 *       200:
 *         description: User updated successfully.
 *
 */
