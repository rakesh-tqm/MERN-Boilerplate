const {
  unAuthorizedError,
  TooManyRequestError,
} = require("./error.middleware");
const moment = require("moment");
const passport = require("passport");
const jwt = require("jsonwebtoken"); // For token generation

const user = require("../models/user.model");

// * Secure User Routes
const secureRoute = (userType) => {
  return async (req, res, next) => {
    // console.log("secure route:", req.user, userType);
    if (req?.user?.type && userType.includes(req?.user?.type)) {
      return next();
    }

    return next(new unAuthorizedError());
  };
};

// * Middleware function for Attempt checking
const attemptCheck = async (req, res, next) => {
  const attemptLimit = process.env.MAX_ATTEMPT;
  const waitMin = process.env.WAIT_MINS_AFTER_ATTEMPTED;
  try {
    const { email } = req.body;

    const getUser = await user.findOne({
      email,
    });

    // Retrieve attempt count based on your chosen storage method
    let attemptCount = getUser?.num_attempts; // Initialize
    const last_attempted = getUser?.last_attempted;
    const currentUTCTime = moment.utc().format("YYYY-MM-DD HH:mm:ss[Z]");
    const last_attempted_UTC = moment(last_attempted)
      .utc()
      .add(parseInt(waitMin), "minutes")
      .format("YYYY-MM-DD HH:mm:ss[Z]");

    // console.log('currentUTCTime', currentUTCTime, last_attempted_UTC, moment(currentUTCTime).isSameOrBefore(moment(last_attempted_UTC)) );

    if (
      attemptCount >= attemptLimit &&
      moment(currentUTCTime).isSameOrBefore(moment(last_attempted_UTC))
    ) {
      return next(new TooManyRequestError());
    } else {
      next(); // Let Passport handle authentication
    }
  } catch (err) {
    return next(new unAuthorizedError(err.message));
  }
};

// * check for the Bearer token
const protectedRoute = (req, res, next) => {
  passport.authenticate(
    "bearer",
    { session: false },
    async (err, user, info) => {
      if (err) {
        return next(new unAuthorizedError());
      }

      //authentication error
      if (!user) {
        return next(new unAuthorizedError());
      }
      req.user = user;
      // console.log(`user user`, user);
      //success
      return next();
    }
  )(req, res, next);
};

// * Function to generate a JWT token (replace with your implementation)
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const payload = {
    email: user?.email,
    id: user?.id,
    type: user?.type,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" }); // Replace with desired expiration time
};

module.exports = {
  secureRoute,
  attemptCheck,
  protectedRoute,
  generateToken,
};
