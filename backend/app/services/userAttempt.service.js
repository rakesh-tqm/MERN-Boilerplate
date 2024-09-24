const moment = require("moment");

const user = require("../models/user.model");
const { BadRequestError } = require("../middleware/error.middleware");

const userAttempted = async (email, status, next) => {
  try {
    const getUser = await user.findOne({
      email,
    });

    if (getUser) {
      const currentDate = moment.utc().format('YYYY-MM-DD HH:mm:ss[Z]');
      if (!!status) {
        const updateUser = await user.findOneAndUpdate(
          {
            email,
          },
          {
            $set: {
              num_attempts: 0,
              last_attempted: currentDate,
            },
          },
          {
            new: true,
          }
        );
      } else {
        const updateUser = await user.findOneAndUpdate(
          {
            email,
          },
          {
            $set: {
              num_attempts: parseInt(getUser?.num_attempts) + 1,
              last_attempted: currentDate,
            },
          },
          {
            new: true,
          }
        );
      }
    }
  } catch (err) {
    return next(new BadRequestError(err.message));
  }
};

module.exports = { userAttempted };
