const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  likerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  likeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

module.exports = mongoose.model("match", MatchSchema);
