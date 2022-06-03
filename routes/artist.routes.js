const router = require("express").Router();
const mongoose = require("mongoose");
const Artist = require("../models/Artist.model");
const Request = require("../models/Request.model");

router.post("/artist", async (req, res, next) => {
  const { _id } = req.payload;
  try {
    // Get the data from the request body
    const {
      name,
      location,
      styles,
      flashes: [{ price, size, estimatedTime, imageUrl }],
      requestsReceived,
      portfolioImages,
    } = req.body;
    console.log(req.body);
    // Save the data in the db
    const createdArtist = await Artist.create({
      owner: _id,
      name,
      location,
      styles,
      flashes: [
        {
          price,
          size,
          estimatedTime,
          imageUrl,
        },
      ],
      requestsReceived,
      portfolioImages,
    });

    res.status(201).json(createdArtist); // 201 Created

    // Update user who created the request
    console.log({ createdArtist });
  } catch (error) {
    res.status(500).json(error); // Internal Server Error
  }
});

router.put("/artist/:artistId", async (req, res, next) => {
  try {
    const { artistId } = req.params;
    const {
      name,
      location,
      styles,
      flashes: [{ price, size, estimatedTime, imageUrl }],
      requestsReceived,
      portfolioImages,
    } = req.body;
    const updatedArtist = await Artist.findByIdAndUpdate(
      artistId,
      {
        name,
        location,
        styles,
        flashes: [
          {
            price,
            size,
            estimatedTime,
            imageUrl,
          },
        ],
        requestsReceived,
        portfolioImages,
      },
      { new: true }
    );

    res.status(201).json(updatedArtist); // 201 Created

    // Update user who created the request
    console.log({ updatedArtist });
  } catch (error) {
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
