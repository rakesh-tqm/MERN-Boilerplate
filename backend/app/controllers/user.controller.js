var crypto = require("crypto");

const user = require("../models/user.model");
const { BadRequestError } = require("../../app/middleware/error.middleware");
const { hashPassword } = require("../../app/utils/common.helper");
const { userAttempted } = require("../services/userAttempt.service");

const { sendMailCommon } = require("../services/mail.service");

// * User Sign up
const signupUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const userExist = await user.findOne({ email });

    if (
      userExist &&
      Object.keys(userExist)?.length &&
      Object.keys(userExist)?.length > 0
    ) {
      return next(new BadRequestError("User Email already exist."));
    }

    var salt = crypto.randomBytes(16);

    const hashedPassword = await hashPassword(password, salt);

    const randomStr = crypto.randomBytes(16).toString("hex");

    user
      .create({
        email,
        password: hashedPassword,
        salt,
        name,
        confirm_email_token: randomStr,
      })
      .then((created) => {
        // var userData = {
        //   id: created.id,
        //   username: username,
        // };

        // req.login(userData, function (err) {
        //   if (err) {
        //     return next(err);
        //   }
        //   return res.send("user added");
        // });

        // * Confirmation Email
        sendMailCommon({
          to: created?.email, // the user email
          subject: "Confirmation Email",
          html: `<h4>Please confirm the email by following API endpoint: http://localhost:${process.env.PORT}/api/v1/user/confirm-email</h4>`,
        });

        return res.json({
          description:
            "A new user has been successfully added. Confrimation Email token: " +
            randomStr,
        });
      })
      .catch((error) => {
        return next(new BadRequestError(error.message));
      });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * User Forget Password
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const getUser = await user.findOne({ email, status: "active" });

    if (!getUser || !Object.keys(getUser)?.length) {
      return next(
        new BadRequestError("Account either does not exist or is not active.")
      );
    }

    const randomStr = crypto.randomBytes(16).toString("hex");

    user
      .findOneAndUpdate(
        {
          email,
        },
        {
          $set: { reset_password_token: randomStr },
        },
        { new: true }
      )
      .then((userData) => {
        // * Send reset email to user
        sendMailCommon({
          // to: "guruprem786@yopmail.com", // the user email
          to: userData?.email, // the user email
          subject: "Reset your Password",
          html: `<h4>You can reset your password by using this API endpoint: http://localhost:${process.env.PORT}/api/v1/user/forget-password</h4>`,
        });

        return res.json({
          description: "Reset password link has been sent to your email id.",
        });
      })
      .catch((err) => {
        return next(new BadRequestError(err.message));
      });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * User Reset Password
const resetPassword = async (req, res, next) => {
  try {
    const { newPassword, resetToken, email } = req.body;

    const getUser = await user.findOne({
      reset_password_token: resetToken,
      email,
      status: "active",
    });

    if (!getUser || !Object.keys(getUser)?.length) {
      await userAttempted(email, false, next);
      return next(new BadRequestError());
    }

    const newHashedPassword = await hashPassword(newPassword, getUser.salt);

    user
      .findOneAndUpdate(
        {
          _id: getUser.id,
        },
        {
          $set: { reset_password_token: "", password: newHashedPassword },
        },
        { new: true }
      )
      .then(async (userData) => {
        await userAttempted(email, true, next);

        return res.json({
          description: "Password has been updated successfully.",
        });
      })
      .catch((err) => {
        return next(new BadRequestError(err.message));
      });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * User Confirmation Email
const confirmEmail = async (req, res, next) => {
  try {
    const { token, email } = req.body;

    const getUser = await user.findOne({
      confirm_email_token: token,
      email,
    });

    if (!getUser || !Object.keys(getUser)?.length) {
      await userAttempted(email, false, next);
      return next(new BadRequestError());
    }

    user
      .findOneAndUpdate(
        {
          _id: getUser.id,
        },
        {
          $set: { confirm_email_token: "", status: "active" },
        },
        { new: true }
      )
      .then(async (userData) => {
        await userAttempted(email, true, next);

        return res.json({
          description: "Email has been confirmed successfully.",
        });
      })
      .catch((err) => {
        return next(new BadRequestError(err.message));
      });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * Get User Profile
const getUser = async (req, res, next) => {
  try {
    console.log("req.user", req.user);
    const { id } = req.user;
    const getData = await user
      .findOne({ _id: id, status: "active" })
      .select("id email name");

    if (!getData || !Object.keys(getData)?.length) {
      return next(new BadRequestError());
    }

    return res.json({ data: getData });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * Update User Profile
const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name } = req.body;
    const updateData = await user.findOneAndUpdate(
      { _id: id, status: "active" },
      { $set: { name } },
      { new: true }
    );

    // console.log("updateData", updateData);

    if (!updateData || !Object.keys(updateData)?.length) {
      return next(new BadRequestError());
    }

    return res.json({ description: "User updated successfully." });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * Update User password
const updatePassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword: password } = req.body;

    const getUser = await user.findOne({ _id: id, status: "active" });

    if (!getUser || !Object.keys(getUser)?.length) {
      return next(new BadRequestError());
    }

    var salt = getUser.salt;

    const hashedOldPassword = await hashPassword(oldPassword, salt);

    if (!crypto.timingSafeEqual(getUser.password, hashedOldPassword)) {
      return next(new BadRequestError());
    }

    const hashedPassword = await hashPassword(password, salt);

    const updateData = await user.findOneAndUpdate(
      { _id: id },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updateData || !Object.keys(updateData)?.length) {
      return next(new BadRequestError());
    }

    return res.json({ description: "User's password updated successfully." });
  } catch (err) {
    return next(new Error(err.message));
  }
};

module.exports = {
  signupUser,
  forgetPassword,
  resetPassword,
  getUser,
  updateProfile,
  updatePassword,
  confirmEmail,
};
