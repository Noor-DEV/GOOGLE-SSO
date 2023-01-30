const express = require("express");
const https = require("https");
const fs = require("fs");
const passport = require("passport");
const apiRouter = require("./api/index");
const cors = require("cors");
const cookieSession = require("cookie-session");
const errorHandler = require("./errorHandler");
const path = require("path");
// const { sequelize, User } = require("./models/index");

require("dotenv").config();
require("./auth/passport");
require("./auth/passportGoogleSSO");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.json({ msg: "ALL_OK", rs: "TESTING......" });
});
app.use(apiRouter);
app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);
// app.listen(PORT, () => {
//   console.log(`UP AND RUNNING ON PORT: ${PORT}`);
// });

https
  .createServer(
    {
      cert: fs.readFileSync(path.join(__dirname, "keys", "cert.pem")),
      key: fs.readFileSync(path.join(__dirname, "keys", "key.pem")),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`UP AND RUNNING ON PORT: ${PORT}`);
  });
