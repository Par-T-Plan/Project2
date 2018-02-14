const express = require("express");
const eventRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const Event = require("../models/Event");
const Task = require("../models/Task");
const bcryptSalt = 10;
const eventsController = express.Router();
const moment = require("moment");

eventRoutes.get("/show", (req, res, next) => {
  Event.find({}, (err, event) => {
    console.log("TODOS LOS EVENTOS", event);
    res.render("events/index", { event: event });
  });
});

eventRoutes.get("/showme", (req, res, next) => {
  Event.find({ owner_id: res.locals.user }, (err, myevent) => {
    console.log("SOLO MIS EVENTOS", myevent);
    res.render("events/myevent", { myevent: myevent });
  });
});

eventRoutes.get("/new", (req, res, next) => {
  res.render("events/new");
});

eventRoutes.post("/new", (req, res, next) => {
  console.log(req.body, res.locals.user);
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    city: req.body.city,
    location: [(lat = req.body.lat), (log = req.body.log)],
    task: [],
    owner_id: res.locals.user._id
  });
  event.save((err, evento) => {
    if (err) {
      return err;
    } else {
      User.update(
        { _id: res.locals.user._id },
        { $push: { eventOwner: evento._id } },
        { new: true }
      ).then(res.redirect("/event/show"));
      //return res.redirect("/event/show");
    }
  });
});

eventRoutes.get("/show/:id/detail", (req, res, next) => {
  Event.findById(req.params.id)
    .populate("task")
    .exec(function(err, event) {
      if (err) return handleError(err);
      console.log(event);
      res.render("events/detail", { event: event, user: res.locals.user });
    });
});

eventRoutes.get("/show/:id/delete", (req, res, next) => {
  Event.findByIdAndRemove(req.params.id, (err, obj) => {
    if (err) {
      return next(err);
    }
    console.log("ME CARGO EL OBJETO", obj);
    res.redirect("/event/show");
  });
});

eventRoutes.get("/show/:id/edit", (req, res, next) => {
  Event.findById(req.params.id).exec(function(err, event) {
    if (err) return handleError(err);
    console.log(event);
    res.render("events/edit", { event: event, user: res.locals.user });
  });
});

eventRoutes.post("/show/:id/edit", (req, res, next) => {
  console.log("EDIT", console.log(req.body))
  const { name, description, lat, log } = req.body;
  const updates = { name, description, location: [(lat), (log)] };
  Event.findByIdAndUpdate(req.params.id, updates, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect(`/event/show/${result._id}/detail`);
  });
});

module.exports = eventRoutes;
