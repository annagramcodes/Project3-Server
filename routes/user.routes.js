const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const jwt = require("jsonwebtoken");

router.get("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .populate("requestsMade")
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => res.json(err));
});

router.put(
  "/profile/:userId",

  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { _id } = req.payload;
      if (_id != userId) {
        res.status(403).json({ errorMessage: "Unauthorized user" });
        return;
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }
      const { username, email, password, imageUrl } = req.body;

      let image;
      if (imageUrl) {
        image = imageUrl;
      } else {
        image =
          "https://res.cloudinary.com/da1zyjl9a/image/upload/v1654589364/tattoos/mystery_atzvql.jpg";
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email, password, imageUrl: image },
        { new: true }
      );
      console.log(updatedUser);
      const payload = {
        _id: updatedUser._id,
        email: updatedUser.email,
        imageUrl: updatedUser.imageUrl,
        username: updatedUser.username,
        profileType: updatedUser.profileType,
      };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      res.status(201).json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

router.delete("/profile/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }
    await User.findByIdAndDelete(userId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
