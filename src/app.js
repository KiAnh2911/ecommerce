const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// init middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
//  init db

require("./dbs/mongodb");

// const { checkOverload } = require("./helpers/check.connect");
// checkOverload();

// init router
app.use("/", require("./routes"));

//  handler error

// 3 parameters at method definition ==> middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// 4 parameter => handling error method
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  next(error);
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
