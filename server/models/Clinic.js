// models/Clinic.js
const mongoose = require("mongoose");

const ClinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Clinic", ClinicSchema);
