const express = require("express");
const router = express.Router();

const {
  validate,
  signupValidate,
  forgetPassValidate,
  resetPassValidate,
  updateProfileValidate,
  changePasswordValidate,
  confirmEmailValidate,
} = require("../../utils/routeValidate.helper");

const {
  signupUser,
  forgetPassword,
  resetPassword,
  getUser,
  updateProfile,
  updatePassword,
  confirmEmail,
} = require("../../controllers/user.controller");

const {
  secureRoute,
  attemptCheck,
  protectedRoute,
} = require("../../middleware/secure.middleware");

// * Sign up Route
router.post("/signup", validate(signupValidate), signupUser);

// * Forget Password Route
router.post("/forget-password", validate(forgetPassValidate), forgetPassword);

// * Reset Password Route
router.post(
  "/reset-password",
  validate(resetPassValidate),
  attemptCheck,
  resetPassword
);

// * Email Confirmation Route
router.post(
  "/confirm-email",
  validate(confirmEmailValidate),
  attemptCheck,
  confirmEmail
);

// router.route("/dashboard").get(secureRoute, async (req, res, next) => {
//   res.send(req.session);
// });

// * User change password
router.put(
  "/change-password",
  protectedRoute,
  secureRoute(["user", "admin"]),
  validate(changePasswordValidate),
  updatePassword
);

// * Get User Profile Route
router
  .route("/")
  .get(protectedRoute, secureRoute(["user", "admin"]), getUser)
  .put(
    protectedRoute,
    secureRoute(["user", "admin"]),
    validate(updateProfileValidate),
    updateProfile
  );

module.exports = router;
