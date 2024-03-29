const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// All Routers
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");
const favRouter = require("./routes/favorite.route");


// App initiate

const app = express();
const corsOptions = {
  origin: true,
  Credential: true,
};

// Connect to db done

const connectDb = async () => {
  
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Data base is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

// Middleware

dotenv.config();
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/fav", favRouter);


// Connect to server
app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`App is running on port ${process.env.PORT}`);
});