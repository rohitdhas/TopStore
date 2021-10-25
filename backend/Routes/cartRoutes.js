const express = require("express");
const router = express.Router();
const { getCartItems, modifyCartItems, modifyCart, placeOrder, createNewProduct } = require('../Controller/CartController');

router.post("/cart/modify", modifyCart);

router.post("/cart/item/modify", modifyCartItems);

router.get("/cart-items", getCartItems);

router.post("/place-order", placeOrder);

router.post("/product/add", createNewProduct);

module.exports = router;
