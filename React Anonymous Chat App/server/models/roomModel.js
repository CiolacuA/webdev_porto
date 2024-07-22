const mongoose = require("mongoose");
const userModel = require("./userModel");

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: true // true = public ; false = private
  },
  roomPassword: {
    type: String,
    $cond: {
        if: {isPrivate: false}, then: {required: true}, else: {required: false} 
    },
    min: 8,
  },
  roomOwner: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model("Rooms", roomSchema);
