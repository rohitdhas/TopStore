const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../model/usersSchema");
const bcrypt = require("bcrypt");
const resMessages = require("./responseMessages");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.json({ message: resMessages.err });
    if (!user) res.json({ message: info.message });
    else {
      req.logIn(user, (err) => {
        if (err) res.json({ message: resMessages.err });
        else {
          const { cart, email, full_name } = req.user;
          res.send({
            message: resMessages.loginSuccess,
            data: { cart, email, full_name },
          });
        }
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.json({ message: resMessages.loggedOut });
});

router.get("/isAuthenticated", (req, res) => {
  if (req.user) res.send(true);
  else res.send(false);
});

router.post("/user/create", async (req, res) => {
  const { email, password } = req.body;
  User.find({ email }, async (err, doc) => {
    if (err) res.json({ message: resMessages.err });
    if (doc.length !== 0) res.json({ message: resMessages.userExist });
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      const user = new User(req.body);
      user.save();
      res
        .status(201)
        .json({ message: resMessages.accountCreated, status: "success" });
    }
  });
});

router.get("/data", (req, res) => {
  if (req.user) {
    const { full_name, email, cart } = req.user;
    res.json({
      message: resMessages.loginSuccess,
      data: { full_name, email, count: cart.length },
    });
  } else res.json({ message: resMessages.unauthorized });
});

module.exports = router;
