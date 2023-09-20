const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  number1: {
    type: String,
    required: false,
  },
  number2: {
    type: String,
    required: false,
  },
  building: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  logo: {
    type: String,
    required: false,
    default:
      'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
