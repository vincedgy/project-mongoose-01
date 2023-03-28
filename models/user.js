const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    number: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  hobbies: {
    type: Array,
  },
});

module.exports = mongoose.model('user', userSchema)