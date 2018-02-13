const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Event = require('../models/Event');
const User = require('../models/User');

const EventsSchema = new Schema({
  name: String,
  description: String,
  location:[
    lat = Number,
    lng = Number
     ],
  task : [],
  owner_id: {type: Schema.Types.ObjectId,ref:"User"},
});

const Events = mongoose.model("Events", EventsSchema);

module.exports = Events;