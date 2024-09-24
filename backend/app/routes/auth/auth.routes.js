const express = require("express");
const router = express.Router();
var passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken"); // For token generation
var crypto = require("crypto");

const user = require("../../models/user.model");
const { userAttempted } = require("../../services/userAttempt.service");

const { BadRequestError } = require("../../middleware/error.middleware");
const { validate, loginValidate } = require("../../utils/routeValidate.helper");
const { hashPassword } = require("../../utils/common.helper");
const {
  attemptCheck,
  generateToken,
} = require("../../middleware/secure.middleware");

passport.use(
  new BearerStrategy((token, done) => {
    const secret = process.env.JWT_SECRET;
    // Verify the token using JWT (replace with your implementation)
    try {
      const decoded = jwt.verify(token, secret);
      return done(null, decoded); // Return decoded user data if valid
    } catch (error) {
      return done(null, false, {
        message: "Incorrect email or password.",
      }); // Invalid token
    }
  })
);

// passport.serializeUser(function (user, cb) {
//   process.nextTick(function () {
//     cb(null, { id: user.id, email: user.email, type: user.type });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

// * Login Route
router.post(
  "/login",
  validate(loginValidate),
  attemptCheck,
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userData = await user.findOne({ email, status: "active" });

      if (!userData) {
        await userAttempted(email, false, next);
        return next(new BadRequestError("Incorrect email or Password."));
      }

      const hashedPassword = await hashPassword(password, userData.salt);

      if (!(await crypto.timingSafeEqual(userData.password, hashedPassword))) {
        await userAttempted(email, false, next);
        return next(new BadRequestError("Incorrect email or Password."));
      }

      const { id, type } = userData; // Replace with actual user data
      const token = await generateToken({ id, email, type });
      await userAttempted(email, true, next);
      return res.json({ token });
    } catch (err) {
      // console.log("err 1:", err);
      await userAttempted(email, false, next);

      return next(new BadRequestError(err.message));
    }
  }
);

// * Logout Route
// router.post("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//   });
//   res.json({ description: "User logout successfully." });
// });

module.exports = router;
