const router = require("express").Router();
const mongoose = require("mongoose");
const Artist = require("../models/Artist.model");
const Request = require("../models/Request.model");
const jwt = require("jsonwebtoken");
const fileUploader = require("../config/cloudinary.config");

router.get("/artist", async (req, res, next) => {
  try {
    const allArtists = await Artist.find();
    res.status(200).json(allArtists);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get Artist by artistId
router.get("/artist/:artistId", (req, res, next) => {
  const { artistId } = req.params;

  Artist.findById(artistId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// get Artist by userId
router.get("/artist/byUser/:userId", (req, res, next) => {
  const { userId } = req.params;

  Artist.findOne({ owner: userId })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.post("/artist", async (req, res, next) => {
  const { _id } = req.payload;
  console.log(req.body);
  try {
    // Get the data from the request body
    const {
      name,
      businessHours,
      location,
      styles,
      // flashes: [{ price, size, estimatedTime, imageUrl }],
      requestsReceived,
      portfolioImages,
    } = req.body;
    console.log(req.body);
    // Save the data in the db
    const createdArtist = await Artist.create({
      owner: _id,
      name,
      businessHours,
      location,
      styles,
      flashes: [
        // {
        //   price,
        //   size,
        //   estimatedTime,
        //   imageUrl,
        // },
      ],
      requestsReceived,
      portfolioImages,
    });

    res.status(201).json(createdArtist); // 201 Created

    console.log({ createdArtist });
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // Internal Server Error
  }
});

router.put("/artist/:artistId", async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const { _id } = req.payload;

    const {
      name,
      location,
      businessHours,
      styles,
      flashes,
      requestsReceived,
      portfolioImages,
      owner,
    } = req.body;

    if (_id != owner) {
      res.status(403).json({ errorMessage: "Unauthorized user" });
      return;
    }
    const updatedArtist = await Artist.findByIdAndUpdate(
      artistId,
      {
        name,
        location,
        businessHours,
        styles,
        flashes,
        requestsReceived,
        portfolioImages,
      },
      { new: true }
    );

    res.status(201).json(updatedArtist); // 201 Created

    // Update user who created the request
    console.log({ updatedArtist });
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // Internal Server Error
  }
});
router.delete("/artist/:artistId", async (req, res, next) => {
  try {
    const { artistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    await Artist.findByIdAndDelete(artistId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
