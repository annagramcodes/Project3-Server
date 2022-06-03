const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const jwt = require("jsonwebtoken");

router.get("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put(
  "/profile/:userId",
  fileUploader.single("existingImage"),
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
      const { username, email, password, existingImage } = req.body;

      let image;
      if (req.file) {
        image = req.file.path;
      } else {
        image = existingImage;
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
        username: updatedUser.username,
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
