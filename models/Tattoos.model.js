const { Schema, model } = require("mongoose");

const TattoosSchema = new Schema({
  imageUrl: {
    type: String,
  },
  favoritedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Tattoos = model("Tattoos", TattoosSchema);

module.exports = Tattoos;
