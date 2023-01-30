module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res
      .status(401)
      .send(
        "<h1>You must login first!<h1><br/><a href='/login/google'>Login With Google</a>"
      );
  }
};
