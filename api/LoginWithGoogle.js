const router = require("express").Router();
const passport = require("passport");

const errorLoginUrl = "http://localhost:3000/login/error";
const successLoginUrl = "http://localhost:3000/login/success";

const errorLoginUrl1 = "http://localhost:8080/login/error";
const successLoginUrl1 = "https://localhost:8080/";

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot Login to Google, please try again",
    failureRedirect: errorLoginUrl1,
    successRedirect: "https://localhost:8080/",
  }),
  (req, res) => {
    res.send("THANK YOU 4 SIGNING IN......");
    console.log("....redirect after .......", req.user);
  }
);
// router.get('/register/google',)

router.get("/login/error", (req, res) => {
  return res.json({ msg: "ERORR GOOGLE AUTHING" });
});
module.exports = router;
