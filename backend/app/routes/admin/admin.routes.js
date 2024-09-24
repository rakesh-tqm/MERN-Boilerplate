const express = require("express");
const router = express.Router();

const {
  secureRoute,
  protectedRoute,
} = require("../../middleware/secure.middleware");

const {
  getAllUser,
  getSingleUser,
  admUpdateProfile,
  admUserAcc,
  admUserDel,
} = require("../../controllers/admin.controller");

const {
  adminUsersValidate,
  adminSingleUserValidate,
  validate,
  admUpdateUserValidate,
  adminCreateUserValidate,
} = require("../../utils/routeValidate.helper");

// * User CRUD APIs
router
  .route("/user")
  .get(
    protectedRoute,
    secureRoute(["admin"]),
    validate(adminUsersValidate),
    getAllUser
  )
  .post(
    protectedRoute,
    secureRoute(["admin"]),
    validate(adminCreateUserValidate),
    admUserAcc
  )
  .put(
    protectedRoute,
    secureRoute(["admin"]),
    validate(admUpdateUserValidate),
    admUpdateProfile
  )
  .delete(
    protectedRoute,
    secureRoute(["admin"]),
    validate(adminSingleUserValidate),
    admUserDel
  );

// * Get single user
router
  .route("/get-single-user")
  .post(
    protectedRoute,
    secureRoute(["admin"]),
    validate(adminSingleUserValidate),
    getSingleUser
  );

module.exports = router;
