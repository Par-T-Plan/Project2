import { Module } from "module";

const express = require("express");
const eventRoutes = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport')
const Event = require("../models/Event");
const debug = require("ptp");
const bcryptSalt = 10;




module.exports = eventRoutes;
