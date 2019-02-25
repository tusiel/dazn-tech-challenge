const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    streamCount: {
      type: Number,
      required: true
    }
  },
  { bufferCommands: false }
);

module.exports = mongoose.model("User", userSchema);
