// import { EACCES } from "constants";

const mongoose = require("mongoose");
const Event = require("../models/Event");

mongoose.connect("mongodb://localhost/event-ptp");

const events = [
 {
   eventname: "BiciMadrid",
   eventdescription: "Ruta de descenso urbano por la capital del reino",
 
 },
 {
   eventname: "Iron Beers",
   eventdescription: "Cerveza subvencionada",

 },
 {
    eventname: "Fiesta de Blas",
    eventdescription: "Fiesta de disfraces",

 }
];

Event.collection.drop();

Event.create(events, (err, event) => {
 if (err) {
     console.log(err)
   throw err;
 }
 console.log(event);
 mongoose.connection.close();
});