const express = require("express");
const router = express.Router();
const User = require("../models/user");

const passport = require("passport");

const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middleware");
const isLoggedIn = (req, res, next) => {};

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
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
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are now logged out");
    res.redirect("/campgrounds");
  });
});

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  }
);

module.exports = router;
