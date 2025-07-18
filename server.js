/* eslint-disable import/newline-after-import */
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const connectdatabase = require("./config/database");
const ApiError = require("./utils/apierror");
const globalerror = require("./middelwars/errormiddelware");
const Categoryroute = require("./routes/CategoryRoute");
const Brandroute = require("./routes/BrandRoute");
const Productroute = require("./routes/ProductRoute ");
const Userroute = require("./routes/UserRoute");
const signuproute = require("./routes/AuthRoute");
const OrderRoute = require("./routes/OrderRoute");
const CommentRoute = require("./routes/CommentRoute");
const AdminRoute = require("./routes/AdminRoute");
/* connect to database */
connectdatabase();

/* start server */
const app = express();

/* middlewares */

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode is ${process.env.NODE_ENV}`);
}

// Mount Routes

app.use("/api/v1/categories", Categoryroute);
app.use("/api/v1/brands", Brandroute);
app.use("/api/v1/products", Productroute);
app.use("/api/v1/users", Userroute);
app.use("/api/v1/Auth", signuproute);
app.use("/api/v1/orders", OrderRoute);
app.use("/api/v1/comments", CommentRoute);
app.use("/api/v1/admin", AdminRoute);
app.all("*", (req, res, next) => {
  next(new ApiError(`could not find ${req.originalUrl} on this server`, 404));
});

// global error handler middleware

app.use(globalerror);

const Port = process.env.PORT || 8000;
const server = app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    console.log("shutting down the server due to unhandled promise rejection");
    process.exit(1);
  });
});
