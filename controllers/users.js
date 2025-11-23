const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Account created. Welcome to Yelpcamp!");
      res.redirect("/campgrounds");
    });
  } catch (error) {
    req.flash("error", `${error.message}`);
    res.redirect("/register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are now logged out");
    res.redirect("/campgrounds");
  });
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
};
