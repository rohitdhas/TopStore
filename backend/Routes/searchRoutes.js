const express = require("express");
const router = express.Router();
const { searchAutoComplete, searchProducts, getProductDetails, getRandomProducts } = require('../Controller/SearchController');

router.get("/product/:search", searchProducts);

router.get("/product-detail/:id", getProductDetails);

router.get("/products/random", getRandomProducts);

router.get("/search", searchAutoComplete);

module.exports = router;
