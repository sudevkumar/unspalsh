const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, imageUrl, desc } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    let newUser = await UserModel.create({
      name,
      email,
      desc,
      password: hashedPassword,
      imageUrl,
      plus: false,
    });
    res.status(200).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User not found!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).send("Incorect password!");
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        plus: user.plus,
        desc: user.desc,
      },
      process.env.SECRET
    );

    res.status(200).send({ user, token });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
