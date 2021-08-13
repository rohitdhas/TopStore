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
const { response } = require("express");
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
  loggedOut: "Logged Out Successfully!✔",
  cartItemUpdated: "Cart Item Updated Successfully🚀",
  itemAlreadyExist:
    "Can't Finish this Action❌ - Item already exist in the Cart!",
  itemRemoved: "1 item removed from cart✅",
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

app.get("/logout", (req, res) => {
  req.logOut();
  res.json({ message: resMessages.loggedOut });
});

app.get("/product/:search", (req, res) => {
  const productTags = req.params.search.toLowerCase().split(" ");

  Product.find({ tags: { $all: productTags } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.get("/product-detail/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, doc) => {
    if (err) res.send({ message: resMessages.err });
    else res.send(doc);
  });
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

// Route to modify cart - add or remove cart items
app.post("/cart/modify", (req, res) => {
  const { type, data } = req.body;
  if (!req.user) {
    return res.json({ message: resMessages.unauthorized });
  } else {
    const { username } = req.user;

    if (type === "ADD") {
      // Check if product exixt in the cart or not
      User.findOne({ username, "cart._id": data._id }, (err, doc) => {
        if (err) return res.send("err");
        if (doc === null) {
          User.updateOne({ username }, { $push: { cart: data } })
            .then(() => res.send({ message: resMessages.addedToCart }))
            .catch((err) => console.log(err));
        } else {
          res.send({ message: resMessages.itemAlreadyExist });
        }
      });
    } else {
      User.updateOne({ username }, { $pull: { cart: { _id: data._id } } })
        .then(() => res.send({ message: resMessages.itemRemoved }))
        .catch((err) => console.log(err));
    }
  }
});

app.post("/cart/item/modify", (req, res) => {
  const { type, data } = req.body;
  if (!req.user) return res.send({ message: resMessages.unauthorized });
  else {
    const { username } = req.user;

    let updateQuantity = data.quantity;
    if (type === "INCREMENT") {
      updateQuantity += 1;
    } else updateQuantity -= 1;

    User.updateOne(
      { username, "cart._id": data._id },
      { $set: { "cart.$.quantity": updateQuantity } }
    )
      .then(() => res.send({ message: resMessages.cartItemUpdated }))
      .catch(() => res.send({ message: resMessages.err }));
  }
});

app.get("/cart-items", (req, res) => {
  if (!req.user) res.json({ message: resMessages.err });
  else {
    const { cart } = req.user;
    res.json(cart);
  }
});

app.get("/data", (req, res) => {
  if (req.user) {
    const { username, full_name, email } = req.user;
    res.json({
      message: resMessages.loginSuccess,
      data: { username, full_name, email },
    });
  } else res.json({ message: resMessages.unauthorized });
});

// _____________________ NOT SO IMP ROUTES ________________________
app.post("/product/add", (req, res) => {
  const product = new Product(req.body);
  try {
    product.save();
    res.status(201).send({ message: resMessages.productCreated });
  } catch {
    res.status(500).send({ message: resMessages.err });
  }
});

app.get("/isAuthenticated", (req, res) => {
  if (req.user) res.send(true);
  else res.send(false);
});

// ________________________END OF ROUTES________________________

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("Server is Running!");
});
