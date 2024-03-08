const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const FavoriteModel = require("../models/Favorite.model");

const router = express.Router();

// Get Fav Id

router.get("/prod/:userID", verifyToken, async (req, res) => {
  try {
    const fav = await FavoriteModel.find({
      userID: req.params.userID,
    });
    res.status(200).json(fav);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Create

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newFavorite = new FavoriteModel(req.body);
    const saveFavorite = await newFavorite.save();
    res.status(200).send(saveFavorite);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// Delete

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await FavoriteModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Mobile has been deleted!");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;