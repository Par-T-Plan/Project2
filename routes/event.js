// import { Module } from "module";

const express = require("express");
const eventRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport')
const User = require('../models/User');
const Event = require("../models/Event");
const debug = require("ptp");
const bcryptSalt = 10;
const eventsController = express.Router();
const moment = require("moment");

//user access
eventsController.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect("/login");
    }
});
// get my events
eventsController.get("/my-events", (req, res, next) => {
    User
        .findOne({
            username: req.user.username
        }, "_id username"),populate(events)
    });







module.exports = eventRoutes;
