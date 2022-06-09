const { Schema, model } = require("mongoose");
const requestSchema = new Schema({
  requestedBy: { type: Schema.Types.ObjectId, ref: "User" },
  requestedFor: { type: Schema.Types.ObjectId, ref: "Artist" },
  title: {
    type: String,
  },
  placement: {
    type: String,
  },
  size: {
    type: String,
  },
  color: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  imagesUrl: [
    {
      type: String,
    },
  ],
  budget: {
    type: Number,
  },
  appointmentDate: Date,
  status: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
  },
});

const Request = model("Request", requestSchema);

module.exports = Request;
