const passport = require("passport");
const User = require("../model/usersSchema");
const bcrypt = require("bcrypt");
const resMessages = require("./responseMessages");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.json({ message: resMessages.err });
    if (!user) res.json({ message: info.message });
    else {
      req.logIn(user, (err) => {
        if (err) res.json({ message: resMessages.err });
        else {
          res.send({
            message: resMessages.loginSuccess,
            data: req.user,
          });
        }
      });
    }
  })(req, res, next);
}

const logout = (req, res) => {
  req.logOut();
  res.json({ message: resMessages.loggedOut });
}

const checkAuthenticated = (req, res) => {
  if (req.user) res.send(true);
  else res.send(false);
}

const createNewAccount = async (req, res) => {
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
}

const getUserData = (req, res) => {
  if (req.user) {
    res.json({
      message: resMessages.loginSuccess,
      data: req.user
    });
  } else res.json({ message: resMessages.unauthorized });
}

module.exports = { getUserData, createNewAccount, checkAuthenticated, logout, login };
