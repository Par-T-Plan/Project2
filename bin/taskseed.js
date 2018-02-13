const mongoose = require("mongoose");
const Task = require("../models/Task");
const Event = require("../models/Event");
const User = require('../models/User');

mongoose.connect("mongodb://localhost/ptp");

const tasks = [
  {
    name: "Llevar vasos",
    description: "Aportar una cantidad exacta de vasos",
    event_id:"5a82e6452d92ea2a5af2cac7",
    status:false,
    ownerTask: "5a82de18203101202627c50f"
  },
  {
    name: "Llevar bolsa de hielos",
    description: "Aportar una cantidad exacta de hielos",
    event_id:"5a82e6452d92ea2a5af2cac7",
    status:false,
    ownerTask: "5a82de18203101202627c50f"
  },
  {
    name: "Llevar platos",
    description: "Aportar una cantidad exacta de platos",
    event_id:"5a82e6452d92ea2a5af2cac7",
    status:false,
    ownerTask: "5a82de18203101202627c50f"
  }
];

// Task.collection.drop();

Task.create(tasks, (err, tasksCreated) => {
  if (err) {
 
    throw err;
  }
  console.log(tasksCreated)
  tasksCreated.forEach((u) => {
    console.log(`task added ${u.owner_id}`)
    Event.update(
        { "_id" : "5a8306518a2c3b3c03a621f9" }, 
        {$push: {"task" : u._id }},{new : true}
    ).then(u => console.log(u));
});
  // mongoose.connection.close();
});