const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRouter = require("./src/routes/authRouter");
const Model = require("./src/models/model");
const testRouter = require("./src/routes/testRouter");
const userRouter = require("./src/routes/userRouter");
const brandRouter = require("./src/routes/brandRouter");
const categoryRouter = require("./src/routes/categoryRouter");
const productRouter = require("./src/routes/productRouter");
const cartRouter = require("./src/routes/cartRouter");
const orderRouter = require("./src/routes/orderRouter");
const auth = require("./src/middlewares/authMiddleware");
const cors = require("cors");

dotenv.config();
new Model();
app.use(
  cors({
    origin: "*",
  })
);

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/brand", brandRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/cart", auth, cartRouter);
app.use("/order", auth, orderRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
