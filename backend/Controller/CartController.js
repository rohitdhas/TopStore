const resMessages = require("./responseMessages");
const User = require("../model/usersSchema");
const Order = require("../model/orderSchema");
const Product = require("../model/productSchema");

const modifyCart = (req, res) => {
  const { type, data } = req.body;

  if (!req.user) {
    return res.json({ message: resMessages.unauthorized });
  } else {
    const { email } = req.user;

    if (type === "ADD") {
      // Check if product exixt in the cart or not
      User.findOne({ email, "cart._id": data._id }, (err, doc) => {
        if (err) return res.send("err");
        if (doc === null) {
          data.quantity = 1;
          User.updateOne({ email }, { $push: { cart: data } })
            .then(() => res.send({ message: resMessages.addedToCart }))
            .catch((err) => console.log(err));
        } else {
          res.send({ message: resMessages.itemAlreadyExist });
        }
      });
    } else {
      // Remove Item from Cart
      User.updateOne({ email }, { $pull: { cart: { _id: data._id } } })
        .then(() => res.json({ message: resMessages.itemRemoved }))
        .catch((err) => console.log(err));
    }
  }
}

const modifyCartItems = (req, res) => {
  const { type, data } = req.body;
  if (!req.user) return res.send({ message: resMessages.unauthorized });
  else {
    const { email } = req.user;
    let updateQuantity = data.quantity;

    if (type === "INCREMENT" && updateQuantity < 10) {
      updateQuantity += 1;
    } else if (type === "DECREMENT" && updateQuantity !== 1) {
      updateQuantity -= 1;
    } else return res.send({ message: resMessages.err });

    User.updateOne(
      { email, "cart._id": data._id },
      { $set: { "cart.$.quantity": updateQuantity } }
    )
      .then(() => res.send({ message: resMessages.cartItemUpdated }))
      .catch(() => res.send({ message: resMessages.err }));
  }
}

const getCartItems = (req, res) => {
  if (!req.user) res.json({ message: resMessages.err });
  else {
    const { cart } = req.user;
    res.json(cart);
  }
}

const placeOrder = (req, res) => {
  if (!req.user) res.json({ message: resMessages.err });
  else {
    const { address, mobile } = req.body;
    const { cart, email, full_name } = req.user;
    const newOrder = new Order({
      cartItems: cart,
      address,
      email,
      full_name,
      mobile,
    });
    newOrder.save();
    res.end();
  }
}

const createNewProduct = (req, res) => {
  const product = new Product(req.body);
  try {
    product.save();
    res.status(201).send({ message: resMessages.productCreated });
  } catch {
    res.status(500).send({ message: resMessages.err });
  }
}

module.exports = { createNewProduct, placeOrder, getCartItems, modifyCart, modifyCartItems };