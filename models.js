const mongoose = require('mongoose');
const connect = mongoose.createConnection(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  }
})

module.exports = connect.model('User', UserSchema);
