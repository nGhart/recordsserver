const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },

  //you can add multiple schemas
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
  diseases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disease' }],
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  feeds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feed' }],
  invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }],
  matings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mating' }],
  meds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Med' }],
  profile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  quarantines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quarantine' }],
  vaccinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vaccination' }],
  inventories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
