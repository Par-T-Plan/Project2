const mongoose = require("mongoose");
const User = require("../models/User");
const { dbUrl } = require('../config');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
var salt = bcrypt.genSaltSync(bcryptSalt);

mongoose.connect("mongodb://localhost/ptp");

const users = [
      new User({ username: 'Pepe', 
      password:bcrypt.hashSync('pepe', salt),
      eventOwner:[],
      eventGuess:[]}),
      
      new User({ username: 'pepi',
       password:bcrypt.hashSync('pepi', salt),
       eventOwner:[],
       eventGuess:[]}),

      new User({username: 'pepo',
       password:bcrypt.hashSync('pepo', salt),
       eventOwner:[],
       eventGuess:[] })
  ];

User.collection.drop();

User.create(users, (err, userCreated) => {
    if (err) {
        throw err;
    }
    userCreated.forEach((u) => {
        console.log(`user added ${u.username}`)
    });-
    //cierra la conexion
    mongoose.connection.close();
});

