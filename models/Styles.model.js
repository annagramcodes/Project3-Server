const { Schema, model } = require("mongoose");

const StylesSchema = new Schema({
  imageUrl: {
    type: String,
  },
  style: {
    type: String,
  },
  artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
  portfolioImg: [
    {
      type: String,
    },
  ],
});

const Styles = model("Styles", StylesSchema);

module.exports = Styles;
