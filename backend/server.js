const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs-extra");
const path = require("path");
const helmet = require("helmet");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");
// const session = require("express-session");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./app/routes/auth/auth.routes");
const userRoutes = require("./app/routes/user/user.routes");
const adminRoutes = require("./app/routes/admin/admin.routes");
const swaggerOptions = require("./app/utils/swagger.helper");
const { errorHander, notFoundError } = require("./app/middleware/error.middleware");
const db = require("./app/models");

// const DB_CONNECT = require("./utils/Db");

const app = express();
const port = process.env.PORT || 5000;

// * Set CORS
app.use(cors());

// * Use Helmet!
app.use(helmet());

app.use(express.json({ extended: false }));

db.sequelize.sync();

// * create a write stream (in append mode)
const dir = `/${process.env.LOG_DIR}/` || "/log/";
const desiredMode = 0o2775;
fs.ensureDirSync(path.join(__dirname, "..", dir), desiredMode);

var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "..", dir, "access.log"),
    {
        flags: "a",
    }
);

// * Set the logger functionality
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev", { stream: accessLogStream }));
} else {
    app.use(morgan("combined", { stream: accessLogStream }));
}

// * Set DB connection
// DB_CONNECT();

// * Session store for Passport token
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//     // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
//   })
// );
// app.use(passport.authenticate("session"));

// * Use Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// * On page rendering
app.get("/", (req, res) => {
    res.send("Server started");
});

// * Set routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// * Error Handling
app.use(errorHander);

// * Create server on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Additional configuration to prevent revealing framework or language details
app.disable("x-powered-by");
app.set("etag", false);
app.set("case sensitive routing", false);
