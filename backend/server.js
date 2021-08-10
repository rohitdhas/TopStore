require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const Product = require("./model/productSchema");
const User = require("./model/usersSchema");
const cookieParser = require("cookie-parser");
const port = 8080;
// _________________________END OF IMPORTS________________________

// Database Connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((res) => console.log("Mongoose Connected!✅"))
  .catch((err) => console.log("Its error from db"));
// _________________________END OF DB LOGIC________________________

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);
// ________________________MIDDLEWARES END________________________

// Response Messages

const resMessages = {
  err: "ERR - Something Went Wrong❌",
  loginSuccess: "Successfully Authenticated✅",
  userExist: "Username already exist!",
  accountCreated: "Account Created Successfully!✅",
  addedToCart: "1 Item added to Cart ✅",
  productCreated: "Product Created Successfully!✅",
  unauthorized: "Not Authenticated ⚠",
  nodataFound: "No Items found!",
};

// ________________________END OF RES MESSAGES________________________

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.json({ message: resMessages.err });
    if (!user) res.json({ message: info.message });
    else {
      req.logIn(user, (err) => {
        if (err) res.json({ message: resMessages.err });
        else {
          const { username, cart, email, full_name } = req.user;
          res.send({
            message: resMessages.loginSuccess,
            data: { username, cart, email, full_name },
          });
        }
      });
    }
  })(req, res, next);
});

app.get("/product/:search", (req, res) => {
  const productTags = req.params.search.toLowerCase().split(" ");

  Product.find({ tags: { $all: productTags } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.post("/user/create", async (req, res) => {
  const { username, password } = req.body;
  User.find({ username }, async (err, doc) => {
    if (err) res.json({ message: resMessages.err });
    if (doc) res.json({ message: resMessages.userExist });
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      const user = new User(req.body);
      user.save();
      res.status(201).json({ message: resMessages.accountCreated });
    }
  });
});

app.post("/product/add", (req, res) => {
  const product = new Product(req.body);
  try {
    product.save();
    res.status(201).send({ message: resMessages.productCreated });
  } catch {
    res.status(500).send({ message: resMessages.err });
  }
});

app.post("/cart/add", (req, res) => {
  const { productData } = req.body;
  if (!req.user) {
    return res.json({ message: resMessages.unauthorized });
  } else {
    const { username, cart } = req.user;
    User.findOneAndUpdate(
      { username },
      { cart: [...cart, productData] },
      (err) => {
        if (err) res.json({ message: resMessages.err });
        else {
          User.findOne({ username }, (err, doc) => {
            if (err) res.json({ message: resMessages.err });
            else res.json({ message: resMessages.addedToCart, cart: doc.cart });
          });
        }
      }
    );
  }
});

app.get("/cart-items", (req, res) => {
  if (!req.user) res.json({ message: resMessages.err });
  else {
    const { cart } = req.user;
    res.send(cart);
  }
});

app.get("/data", (req, res) => {
  if (req.user) {
    res.json({ message: resMessages.loginSuccess, data: req.user });
  } else res.json({ message: resMessages.unauthorized });
});

// ________________________END OF ROUTES________________________

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("Server is Running!");
});
