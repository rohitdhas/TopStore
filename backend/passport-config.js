const User = require("./model/usersSchema");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) throw err;
        if (!user)
          return done(null, false, { message: "User Doesn't Exist❌" });
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) throw err;
          if (res) {
            return done(null, user);
          } else return done(null, false, { message: "Incorrect Password!❌" });
        });
      });
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      const { username, cart, full_name, email } = user;
      const safeData = { username, cart, full_name, email };
      done(err, safeData);
    });
  });
};
