const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("mongodb://localhost/task-ptp");

const users = [
    {
      username: "pepe",
      password: "pepe",
      facebookID: "1234"
    },
    {
      username: "pepi",
      password: "pepi",
      facebookID: "1234"
    },
    {
      username: "pepo",
      password: "pepo",
      facebookID: "1234"
    }
  ];

User.collection.drop();

User.create(users, (err, user) => {
  if (err) {
      console.log(err)
    throw err;
  }
  mongoose.connection.close();
});