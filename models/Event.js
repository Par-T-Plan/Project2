const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const EventsSchema = new Schema({
  eventname: String,
  eventdescription: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Events = mongoose.model("Events", EventsSchema);

module.exports = Events;