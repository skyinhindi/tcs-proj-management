const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timelineSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  timeline: {
    type: [String],
    required: true,
  },
});

const Timeline = mongoose.model("Timeline", timelineSchema);
module.exports = Timeline;
