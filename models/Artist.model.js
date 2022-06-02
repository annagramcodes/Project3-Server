const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
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
});

const Artist = model("Artist", artistSchema);

module.exports = Artist;
