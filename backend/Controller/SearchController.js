const Product = require("../model/productSchema");
const resMessages = require("./responseMessages");

const searchProducts = (req, res) => {
  const productTags = req.params.search.toLowerCase().split(" ");

  Product.find({ tags: { $all: productTags } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
}

const getProductDetails = (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, doc) => {
    if (err) res.send({ message: resMessages.err });
    else res.send(doc);
  });
}

const getRandomProducts = (req, res) => {
  Product.aggregate([{ $sample: { size: 6 } }])
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
}

const searchAutoComplete = async (req, res) => {
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
}

module.exports = { searchAutoComplete, searchProducts, getProductDetails, getRandomProducts };