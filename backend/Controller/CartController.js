const express = require("express");
const router = express.Router();
const resMessages = require("./responseMessages");
const User = require("../model/usersSchema");

router.post("/cart/modify", (req, res) => {
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
          User.updateOne({ email }, { $push: { cart: data } })
            .then(() => res.send({ message: resMessages.addedToCart }))
            .catch((err) => console.log(err));
        } else {
          res.send({ message: resMessages.itemAlreadyExist });
        }
      });
    } else {
      User.updateOne({ email }, { $pull: { cart: { _id: data._id } } })
        .then(() => res.send({ message: resMessages.itemRemoved }))
        .catch((err) => console.log(err));
    }
  }
});

router.post("/cart/item/modify", (req, res) => {
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
});

router.get("/cart-items", (req, res) => {
  if (!req.user) res.json({ message: resMessages.err });
  else {
    const { cart } = req.user;
    res.json(cart);
  }
});

module.exports = router;
