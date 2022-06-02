const { Schema, model } = require("mongoose");
const requestSchema = new Schema({
  requestedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  requestedFor: [{ type: Schema.Types.ObjectId, ref: "BusinessProfile" }],
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
  imageUrl: {
    type: String,
  },
  budget: {
    type: Number,
  },
  appointmentDate: {
    type: Date,
  },
});

const Request = model("Request", requestSchema);

module.exports = requestSchema;
