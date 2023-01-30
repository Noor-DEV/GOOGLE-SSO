const express = require("express");
const LoginWithGoogleApi = require("./LoginWithGoogle");
const { isUserAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/secret", isUserAuthenticated, (req, res) => {
  res.json({ pass: req.passport, user: req.user });
});

router.use(LoginWithGoogleApi);

module.exports = router;
