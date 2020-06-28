const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    min: 3,
    max: 255,
  },
  picture: {
    type: String,
    max: 255,
    min: 6,
  },
  description: {
    type: String,
    max: 1024,
    min: 6,
  },
  ratings: {
    type: Array,
    max: 255,
    min: 6,
  },
  exercises: [{ type: Schema.ObjectId, ref: "Exercise" }],
  creator: { type: Schema.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Workout", workoutSchema);
