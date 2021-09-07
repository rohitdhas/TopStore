const User = require("./model/usersSchema");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    new localStrategy((email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) throw err;
        if (!user)
          return done(null, false, { message: "Incorrect Username❌" });
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
      const { full_name, email, cart } = user;
      const safeData = { full_name, email, cart };
      done(err, safeData);
    });
  });
};
