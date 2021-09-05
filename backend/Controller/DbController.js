require("dotenv").config();
const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Mongoose Connected!✅"))
  .catch(() => console.log("Its error from DB!"));

module.exports = mongoose;
