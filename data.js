const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userData", dataSchema);
