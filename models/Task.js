const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: String,
    description: String,
    event_id: String,
    status:false,
    ownerTask: {type:Schema.Types.ObjectId ,ref:"User"}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
