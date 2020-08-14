const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина имени должна быть не менее 2 символов'],
    maxlength: [30, 'Максимальная длина имени должна быть не более 30 символов'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина должна быть не менее 2 символа'],
    maxlength: [30, 'Максимальная длина имени должна быть не более 30 символов'],
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (property) => `${property.value} неприемлимая ссылка!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
