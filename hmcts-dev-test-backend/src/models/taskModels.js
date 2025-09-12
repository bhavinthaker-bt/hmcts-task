const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'title is required field'] },
  description: { type: String, required: false },
  status: { type: String, required: [true, 'status is required field'] },
  due_date: { type: Date, required: [true, 'due_date is required field'] },
  created: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
