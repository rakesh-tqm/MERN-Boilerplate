const mongoose = require("mongoose");

const dbConnect = process.env.DB_CONNECT;
const envMode = process.env.ENV_MODE;

const DB = async () => {
  try {
    await mongoose.connect(dbConnect);
    console.log("MongoDB connected ....");
  } catch (error) {
    if (envMode === "development") {
      console.log(`Connection Error: ${error.message}`);
    } else {
      console.log(`Connection Error:`);
    }
    process.exit(1);
  }
};

module.exports = DB;
