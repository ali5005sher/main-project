const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

server.use(cors());
server.use(bodyParser.json());

const createProduct = async (req, res) => {
  console.log(req.body);
  let Image = new image();
  Image.url = req.body.imageData;
  //   console.log(typeof Image.url);
  //   console.log(Image.url);
  await Image.save();
};

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://alisher:WBMeRUQz9uR5pBby@cluster0.bdplcpw.mongodb.net/ecommerceDatabase"
  );
  console.log("db connected succesfully");
}

const imageSchema = new Schema({
  url: Schema.Types.Mixed,
});

const image = mongoose.model("image", imageSchema);

server.post("/upload", createProduct);

server.listen(8084);
