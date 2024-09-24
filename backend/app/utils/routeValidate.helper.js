const { body, validationResult, query } = require("express-validator");
const { BadRequestError } = require("../middleware/error.middleware");
const mongoose = require("mongoose");

// * Validate function with error handler
const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return next(new BadRequestError(errors?.errors[0]["msg"]));
  };
};

// * User login Validate
const loginValidate = [
  body("email").isEmail().withMessage("Email address is invalid."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Not a valid password."),
];

// * User signup validate
const signupValidate = [
  ...loginValidate,
  body("name").trim().notEmpty().withMessage("Fullname is required."),
];

// * Forget password Validate
const forgetPassValidate = [
  body("email").isEmail().withMessage("Not a valid email address."),
];

// * Reset password validate
const resetPassValidate = [
  body("email").isEmail().withMessage("Email address is invalid."),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required.")
    .isLength({ min: 8 })
    .withMessage("Not a valid New password."),
  body("confirmPassword").custom((val, { req }) => {
    if (!val || val !== req.body.newPassword) {
      throw new Error("Confirm password should be same as password.");
    }
    return true;
  }),
  body("resetToken")
    .trim()
    .notEmpty()
    .withMessage("Password reset token is required."),
];

// * Confirm Email validate
const confirmEmailValidate = [
  body("email").isEmail().withMessage("Email address is invalid."),
  body("token")
    .trim()
    .notEmpty()
    .withMessage("Email Confirm token is required."),
];

// * Update Profile validate
const updateProfileValidate = [signupValidate[2]];

// * Change Password validate
const changePasswordValidate = [
  body("oldPassword")
    .trim()
    .notEmpty()
    .withMessage("Old password is required.")
    .isLength({ min: 8 })
    .withMessage("Not a valid Old password."),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required.")
    .isLength({ min: 8 })
    .withMessage("Not a valid New password."),
  body("confirmPassword").custom((val, { req }) => {
    if (!val || val !== req.body.newPassword) {
      throw new Error("Confirm password should be same as new password.");
    }

    return true;
  }),
];

// * Admin Get Users with pagination
const adminUsersValidate = [
  query("page")
    .optional()
    .isNumeric()
    .withMessage("page must be greater than or equal to 1")
    .custom((val) => {
      if (isNaN(val) || val < 1) {
        throw new Error("page must be greater than or equal to 1");
      }
      return true;
    }),
  query("limit")
    .optional()
    .isNumeric()
    .withMessage("page must be greater than or equal to 1")
    .custom((val) => {
      if (isNaN(val) || val < 1) {
        throw new Error("limit must be greater than or equal to 1");
      }
      return true;
    }),
];

// * Admin Get Signle User
const adminSingleUserValidate = [
  body("id").custom((val) => {
    if (!val || !mongoose.isValidObjectId(val)) {
      throw new Error("Please add the valid user id.");
    }
    return true;
  }),
];

// * Admin User Update profile
const admUpdateUserValidate = [
  ...adminSingleUserValidate,
  ...updateProfileValidate,
  body("status")
    .isIn(["active", "inactive"])
    .withMessage("Please select the correct status."),
];

// * Admin User create account
const adminCreateUserValidate = [...signupValidate, admUpdateUserValidate[2]];

module.exports = {
  validate,
  loginValidate,
  signupValidate,
  forgetPassValidate,
  resetPassValidate,
  updateProfileValidate,
  changePasswordValidate,
  adminUsersValidate,
  adminSingleUserValidate,
  admUpdateUserValidate,
  adminCreateUserValidate,
  confirmEmailValidate,
};
