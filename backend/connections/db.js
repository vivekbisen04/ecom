const { MongoClient, ServerApiVersion } = require("mongodb");
const { default: mongoose } = require("mongoose");
const url =
  "mongodb+srv://2022bcs104:vivek123@ecommers.d5e3x.mongodb.net/?retryWrites=true&w=majority&appName=ecommers";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e);
  });
