const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  pay: {
    type: Number,
    required: true,
  },
  measure: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Entry', EntrySchema)