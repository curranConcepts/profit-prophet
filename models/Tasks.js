const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  pay: {
    type: Number,
    required: true,
  },
  measure: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Task', TaskSchema)
