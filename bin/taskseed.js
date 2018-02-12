const mongoose = require("mongoose");
const Task = require("../models/Task");

mongoose.connect("mongodb://localhost/task-ptp");

const tasks = [
  {
    taskname: "Llevar vasos",
    description: "Aportar una cantidad exacta de vasos"
  },
  {
    taskname: "Llevar bolsa de hielos",
    description: "Aportar una cantidad exacta de hielos"
  },
  {
    taskname: "Llevar platos",
    description: "Aportar una cantidad exacta de platos"
  }
];

Task.collection.drop();

Task.create(tasks, (err, task) => {
  if (err) {
      console.log(err)
    throw err;
  }

  mongoose.connection.close();
});