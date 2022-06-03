const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  location: { type: String },
  styles: [{ type: String }],
  flashes: [
    {
      price: { type: Number },
      size: { type: String },
      estimatedTime: { type: String },
      imageUrl: { type: String },
    },
  ],
  requestsReceived: [{ type: Schema.Types.ObjectId, ref: "Request" }],
  portfolioImages: [
    {
      type: String,
    },
  ],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Artist = model("Artist", artistSchema);

module.exports = Artist;
