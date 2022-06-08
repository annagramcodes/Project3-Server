const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    artistProfile: { type: Schema.Types.ObjectId, ref: "Artist" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileType: { type: String, enum: ["client", "artist"], required: true },
    // artistId: { type: Schema.Types.ObjectId, ref: "Artist" },
    favoriteArtists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
    favoriteTattoos: [{ type: Schema.Types.ObjectId, ref: "Tattoos" }],
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/da1zyjl9a/image/upload/v1654589364/tattoos/mystery_atzvql.jpg",
    },
    requestsMade: [{ type: Schema.Types.ObjectId, ref: "Request" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
