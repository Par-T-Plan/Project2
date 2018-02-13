const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require('../models/User');

mongoose.connect("mongodb://localhost/ptp");

const events = [
 {
   name: "BiciMadrid",
   description: "Ruta de descenso urbano por la capital del reino",
   location : [lat = 40.41, lng = -3.70],
   task : [],
   owner_id: "5a82de18203101202627c50f"
 }

];

Event.create(events, (err, eventsCreated) => {
    if (err) {
        throw err;
    }
    eventsCreated.forEach((u) => {
        console.log(`event added ${u.owner_id}`)
        User.update(
            { "_id" : "5a82de18203101202627c50f" }, 
            {$push: {"eventOwner" : u._id }},{new : true}
        ).then(u => console.log(u));
    });
   
    
    //mongoose.connection.close();
});

  //Cuando termino de crear todos los eventos
  //Los tengo que buscar y ponerselos a los usuarios

