const express = require("express");
const router = express.Router();
const Product = require("../model/productSchema");
const resMessages = require("./responseMessages");

router.get("/product/:search", (req, res) => {
  const productTags = req.params.search.toLowerCase().split(" ");

  Product.find({ tags: { $all: productTags } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/product-detail/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, doc) => {
    if (err) res.send({ message: resMessages.err });
    else res.send(doc);
  });
});

router.get("/products/random", (req, res) => {
  Product.aggregate([{ $sample: { size: 6 } }])
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.get("/search", async (req, res) => {
  try {
    let results = await Product.aggregate([
      {
        "$search": {
          "autocomplete": {
            "query": `${req.query.term}`,
            "path": "name",
            "fuzzy": {
              "maxEdits": 1,
            },
          },
        },
      },
    ]);
    res.json({ data: results });
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: e });
  }
});

module.exports = router;
