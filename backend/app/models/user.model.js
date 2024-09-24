const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: Buffer,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    type: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    reset_password_token: {
      type: String,
    },
    confirm_email_token: {
      type: String,
    },
    salt: {
      type: Buffer,
      required: true,
    },
    num_attempts: {
      type: Number,
      default: 0,
    },
    last_attempted: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model("User", userSchema);
