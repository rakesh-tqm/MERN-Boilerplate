var crypto = require("crypto");

const user = require("../models/user.model");
const { BadRequestError } = require("../middleware/error.middleware");
const { hashPassword } = require("../utils/common.helper");

// * Admin get all User
const getAllUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page,
      limit,
      collation: {
        locale: "en",
      },
      select: "id name email status",
    };

    const getData = await user.paginate(
      {
        _id: { $ne: id },
      },
      options
    );
    // console.log("getData", getData);

    if (!getData || !Object.keys(getData)?.length) {
      return next(new BadRequestError());
    }

    return res.json({ data: getData });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * Admin get Single User by Id
const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const getData = await user
      .findOne({
        _id: id,
      })
      .select("id name email type status");
    // console.log("getData", getData);

    if (!getData || !Object.keys(getData)?.length) {
      return next(new BadRequestError());
    }

    return res.json({ data: getData });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * Admin updates User Profile by Id
const admUpdateProfile = async (req, res, next) => {
  try {
    const { name, id, status } = req.body;
    const updateData = await user.findOneAndUpdate(
      { _id: id },
      { $set: { name, status } },
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

// * Admin creates User Account
const admUserAcc = async (req, res, next) => {
  try {
    const { email, password, name, status } = req.body;
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

    user
      .create({
        email,
        password: hashedPassword,
        salt,
        status,
        name,
      })
      .then((created) => {
        return res.json({
          description: "A new user has been successfully added.",
        });
      })
      .catch((error) => {
        return next(new BadRequestError(error.message));
      });
  } catch (err) {
    return next(new Error(err.message));
  }
};

// * Admin Detetes User Account
const admUserDel = async (req, res, next) => {
  try {
    const { id } = req.body;
    const delUser = await user.findOneAndDelete({ _id: id });

    if (!delUser) {
      return next(new BadRequestError());
    }

    return res.json({ description: "User deleted successfully." });
  } catch (err) {
    return next(new Error(err.message));
  }
};

module.exports = {
  getAllUser,
  getSingleUser,
  admUpdateProfile,
  admUserAcc,
  admUserDel,
};
