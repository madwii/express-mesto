const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlegth: 2, maxlegth: 30 },
  link: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", default: [] }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("card", cardSchema);
