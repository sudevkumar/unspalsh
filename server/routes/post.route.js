const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const verifyToken = require("../middleware/verifyToken");

// Get Single Post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Get user Posts

router.get("/user/:userID", async (req, res) => {
  try {
    const post = await Post.find({ userID: req.params.userID }).sort({
      createdAt: -1,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Get Posts

router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const post = await Post.find(query.search ? searchFilter : null).sort({
      createdAt: -1,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Get Posts by Category

router.get("/cat/:category", async (req, res) => {
  try {
    
    const post = await Post.find({category: req.params.category}).sort({
      createdAt: -1,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Create Post

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Update Post

// router.put("/:id", verifyToken, async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json(error);
//     console.log(error);
//   }
// });

// Delete Post

// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     await Post.findByIdAndDelete(req.params.id);
//     await Comments.deleteMany({ postId: req.params.id });

//     res.status(200).json("Post has been deleted!");
//   } catch (error) {
//     res.status(500).json(error);
//     console.log(error);
//   }
// });

module.exports = router;