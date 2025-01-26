require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

/* FILES */
const connectDB = require("../src/config/connectDB.config");
const { userRouter } = require("../src/routes/user.routes.js");

/*ROUTES*/
app.use("/api/v1/user", userRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/*
* whats happening here in server starting ?
** here we adding try..catch black for error handling of listen and db connection,
then in try block i also added  `SIGINT` for checking resources are closed or not manually ,
if any error occur at closing resources then it will show error
*/
const PORT = process.env.PORT || 5465;
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is listening on http://localhost:${PORT}`);
    });
    process.on("SIGINT", async () => {
      console.log("shutting down the server");
      try {
        console.log("cleaning the resources");
        process.exit(0);
      } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error(error);
  }
})();

module.exports = app;
