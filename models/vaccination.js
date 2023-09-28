const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  medication: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  nextDate: {
    type: Number,
    required: true,
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;
