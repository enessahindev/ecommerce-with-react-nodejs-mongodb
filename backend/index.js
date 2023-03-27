const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//mongoDBConnection
const uri =
  "mongodb+srv://mongoDB:15040606@ecommercedb.mpyda6n.mongodb.net/?retryWrites=true&w=majority";
//Use of mongoose
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connection successful!"))
  .catch((err) => console.log("Wrong: " + err.message));

//Application Port Connection
const port = 5000;
app.listen(5000, () => {
  console.log("Application https://localhost:" + port + " is Online...");
});

//----------------------------------------------------------------//
//                      User Collection Start                    //
const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);
//                      User Collection End                        //
//----------------------------------------------------------------//
//                      Product Collection Start                 //

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  stock: Number,
  price: Number,
  imageUrl: String,
  categoryName: String,
});
const Product = mongoose.model("Product", productSchema);

//                      Product Collection End                     //
//----------------------------------------------------------------//
//Multer Add Files Start //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//Multer Add Files End //
//----------------------------------------------------------------//
//                         Add Product List Start                 //
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//                          Add Product List Ended                 //
//----------------------------------------------------------------//
//                          Add Product Start                    //
app.post("/products/add", upload.single("image"), async (req, res) => {
  try {
    const { name, categoryName, stock, price } = req.body;
    const product = new Product({
      _id: uuidv4(),
      name: name,
      categoryName: categoryName,
      stock: stock,
      price: price,
      imageUrl: req.file.path,
    });

    await product.save();
    res.json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//                          Add Product End                        //
//----------------------------------------------------------------//
//                          Remove Product Start                  //
app.post("/products/remove", async (req, res) => {
  try {
    const { _id } = req.body;
    await Product.findByIdAndRemove(_id);
    res.json({ message: "Product removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//                          Remove Product End                   //
//----------------------------------------------------------------//
//                      Basket Collection Start                   //

const basketSchema = new mongoose.Schema({
  _id: String,
  products: String,
  userId: String,
});

const Basket = mongoose.model("Basket", basketSchema);

// Add Basket Start //
app.post("/basket/add", async (req, res) => {
  try {
    const { productId, userId } = req.body;
    let basket = new Basket({
      _id: uuidv4(),
      userId: userId,
      productId: productId,

    });
    await basket.save();

    let product = await Product.findById(productId);
    product.stock = product.stock -1;
    await Product.findByIdAndUpdate(productId, product);

    res.json({ message: "The product, is basket added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Add Basket End  //

//                      Basket Collection End                     //
//----------------------------------------------------------------//
//                      Order Collection Start                    //

const orderSchema = new mongoose.Schema({
  _id: String,
  products: String,
  userId: String,
  count: Number,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);
//                      Order Collection End                      //
//----------------------------------------------------------------//
//                           Tokens Start                         //
const secretKey = "Secret Key";

const options = {
  expiresIn: "1h",
};
//                           Tokens End                           //
//----------------------------------------------------------------//
//                     Register Progress Start                    //
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = new User({
      _id: uuidv4(),
      name: name,
      email: email,
      password: password,
      isAdmin: false,
    });

    await user.save();
    const payload = {
      user: user,
    };
    const token = jwt.sign(payload, secretKey, options);
    res.json({ user: user, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//                     Register Progress End                      //
//----------------------------------------------------------------//
//                     Login Progress Start                      //

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.find({ email: email, password: password }); // Querying user information
    if (users.length == 0) {
      res
        .status(500)
        .json({ message: "User e-mail address or password is incorrect!" });
    } else {
      const payload = {
        user: users[0],
      };
      const token = jwt.sign(payload, secretKey, options);
      res.json({ user: users, token: token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//                     Login Progress End                       //
