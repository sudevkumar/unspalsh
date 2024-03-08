const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const verifyToken = require("../middleware/verifyToken");

// Get User

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Update User

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// // Delete User

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
   

    res.status(200).json("User has been deleted!");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;