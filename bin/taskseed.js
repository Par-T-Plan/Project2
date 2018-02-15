const mongoose = require("mongoose");
const Task = require("../models/Task");
const Event = require("../models/Event");
const User = require('../models/User');

mongoose.connect("mongodb://localhost/ptp");

const tasks = [
  {
    name: "Llevar vasos",
    description: "Aportar una cantidad exacta de vasos",
    event_id:"5a8578c3695b422e2a0aac65",
    status:false,
    ownerTask: "5a8578905b24c22d7c60bbd1"
  },
  {
    name: "Llevar bolsa de hielos",
    description: "Aportar una cantidad exacta de hielos",
    event_id:"5a8578c3695b422e2a0aac65",
    status:false,
    ownerTask: "5a8578905b24c22d7c60bbd1"
  },
  {
    name: "Llevar platos",
    description: "Aportar una cantidad exacta de platos",
    event_id:"5a8578c3695b422e2a0aac65",
    status:false,
    ownerTask: "5a8578905b24c22d7c60bbd1"
  }
];

Task.create(tasks, (err, tasksCreated) => {
  if (err) {
 
    throw err;
  }
  console.log(tasksCreated)
  tasksCreated.forEach((u) => {
    console.log(`task added ${u.owner_id}`)
    Event.update(
        { "_id" : "5a8578c3695b422e2a0aac65" }, 
        {$push: {"task" : u._id }},{new : true}
    ).then(u => console.log(u));
});
  
});