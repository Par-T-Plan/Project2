const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    eventOwner:[{type:Schema.Types.ObjectId,ref:"User"}],
    eventGuess:[{type:Schema.Types.ObjectId,ref:"User"}],
  }
 );

const User = mongoose.model("User", userSchema);

module.exports = User;
