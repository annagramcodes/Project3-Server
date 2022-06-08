const router = require("express").Router();
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const Request = require("../models/Request.model");
const User = require("../models/User.model");
const Artist = require("../models/Artist.model");

//GET /api/requests - Get all existing requests
router.get("/requests", async (req, res, next) => {
  try {
    const allRequests = await Request.find()
      .populate("requestedBy")
      .populate("requestedFor");
    res.status(200).json(allRequests);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/requests/create", async (req, res, next) => {
  const { _id } = req.payload;
  try {
    // Get the data from the request body
    const {
      placement,
      size,
      color,
      description,
      imagesUrl,
      budget,
      appointmentDate,
      artistId,
    } = req.body;

    // Save the data in the db
    // console.log(req.body);
    const createdRequest = await Request.create({
      placement,
      size,
      color,
      description,
      imagesUrl,
      budget,
      appointmentDate,
      requestedBy: _id,
      requestedFor: artistId,
    });

    // // Update user who created the request
    console.log({ createdRequest });

    const updatedClient = await User.findByIdAndUpdate(
      _id,
      {
        $push: { requestsMade: createdRequest._id },
      },
      { new: true }
    );
    const updatedArtist = await Artist.findByIdAndUpdate(
      artistId,
      {
        $push: { requestsReceived: createdRequest._id },
      },
      { new: true }
    );

    res.status(201).json(createdRequest); // 201 Create
  } catch (error) {
    res.status(500).json(error); // Internal Server Error
  }
});

router.get("/requests/:requestId", async (req, res, next) => {
  try {
    // Get the request id from the URL
    const { requestId } = req.params; //   in Express `:` means `req.params`
    console.log(`requestId`, requestId);

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // Make a DB query
    const oneRequest = await Request.findById(requestId);

    // .populate('destination').populate('requestedBy');

    // Send the response
    res.status(200).json(oneRequest);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE /api/requests/:requestId  - Delete a specific request
router.delete("/requests/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // const foundRequest = await Request.findById(requestId)
    //   // .populate("requestedBy")
    //   // .populate("requestedFor");

    // console.log(foundRequest);

    // //Update user who created the request
    // const creatorUser = await User.findById(foundRequest.requestedBy);
    // const updatedCreatorUser = await User.findByIdAndUpdate(
    //   foundRequest.requestedBy,
    //   { $pull: { requestsMade: foundRequest._id } }
    // );
    // const contactedArtist = await Artist.findById(foundRequest.requestedFor);
    // const updatedcontactedArtist = await Artist.findByIdAndUpdate(
    //   foundRequest.requestedFor,
    //   { $pull: { requestedReceived: foundRequest._id } }
    // );

    await Request.findByIdAndDelete(requestId);

    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/requests/:id/accept", async (req, res, next) => {
  try {
    const { id } = req.params;
    let request = await Request.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    )

      .populate({
        path: "requestedBy",
        model: "User",
      })
      .populate({
        path: "requestedFor",
        model: "Artist",
      })
      .populate({
        path: "requestsReceived",
        model: "Artist",
      })
      .populate({
        path: "requestsMade",
        model: "User",
      });

    await Artist.findByIdAndUpdate(request.requestedFor._id, {
      $pull: { requestsReceived: request._id },
    });

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/requests/:id/reject", async (req, res, next) => {
  try {
    const { id } = req.params;
    let request = await Request.findByIdAndUpdate(id, { new: true });

    await Artist.findByIdAndUpdate(request.requestedFor._id, {
      $pull: { requestsReceived: request._id },
    });

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
