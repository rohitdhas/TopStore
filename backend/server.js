require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')
const cookieParser = require("cookie-parser");
const cartRoutes = require("./Controller/CartController");
const searchRoutes = require("./Controller/SearchController");
const stripeGateway = require("./Controller/StripeController");
const userRoutes = require("./Controller/UserController");
// _________________________END OF IMPORTS________________________

// Database Connection

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Mongoose Connected!✅"))
  .catch(() => console.log("Its error from DB!"));

// Middlewares

app.use(express.json());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({ mongoUrl: dbURI }),
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);
// ________________________MIDDLEWARES END________________________

// Routes

app.use(cartRoutes);
app.use(searchRoutes);
app.use(stripeGateway);
app.use(userRoutes);

// ________________________END OF ROUTES________________________

app.listen(process.env.PORT || 4000, (err) => {
  if (err) console.log(err);
  else console.log("Server is Running!");
});
