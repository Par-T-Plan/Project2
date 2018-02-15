const express = require("express");
const taskRoutes = express.Router();
// const debug = require('debug')('ptp');
const Task = require("../models/Task");
const User = require("../models/User");
const Event = require("../models/Event");

const moment = require("moment");

  taskRoutes.get("/:id/new", (req, res, next) => {
    Event.findById(req.params.id).exec(function(err, event) {
        if (err) return handleError(err);
        res.render("tasks/new", { event: event,});
      });
  });

  taskRoutes.post("/:id/new", (req, res, next) => {

    const task = new Task({
      name: req.body.name,
      description: req.body.description,
      event_id: req.params.id,
      status: false,
      ownerTask: res.locals.user._id,
      
    });
    task.save((err, obj) => {
      if (err) {
        return err;
      } else {
        const task = obj;
        Event.update(
          { _id: req.params.id },
          { $push: { task: obj._id } }
        ).then(res.redirect(`/event/show/${task.event_id}/detail`));
    }
});
});

taskRoutes.get("/:id/delete", (req, res, next) => {
  Event.findByIdAndRemove(req.params.id, (err, obj) => {
    if (err) {
      return next(err);
    }
    console.log("ME CARGO EL OBJETO", obj);
    res.redirect("/event/show");
  });
});

taskRoutes.get("/:id/edit", (req, res, next) => {
const event = req.params.event
console.log(event)
  Task.findById(req.params.id).exec(function(err, task) {
    if (err) return handleError(err);
    console.log(task);
    res.render("tasks/edit", { task: task});
  });
});

taskRoutes.post("/:id/edit", (req, res, next) => {
  console.log("EDIT", console.log(req.body))
  const { name, description, status} = req.body;
  const updates = { name, description, status };
  Task.findByIdAndUpdate(req.params.id, updates, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result)
    res.redirect(`/event/show/${result.event_id}/detail`);
  });
});


module.exports = taskRoutes;