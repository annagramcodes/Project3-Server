const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

router.post(
  "/uploads",
  fileUploader.array("imagesUrl", 10),
  (req, res, next) => {
    const newPhotos = [];

    req.files.forEach((file) => {
      newPhotos.push(file.path);
    });

    if (!req.files) {
      next(new Error("No files uploaded!"));
      return;
    }

    res.json({ newPhotos });
  }
);

module.exports = router;
