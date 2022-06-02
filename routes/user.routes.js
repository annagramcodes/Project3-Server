const router = require("express").Router();
const User = require("../models/User.model");
// const fileUploader = require("../config/cloudinary.config");

router.put("/profile/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, email, password, imageUrl } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, password, email, imageUrl },
      { new: true }
    );
    console.log(updatedUser);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json(error); // Internal Server Error
  }
});

module.exports = router;
