const mongoose = require('mongoose');
const connect = mongoose.createConnection(
  'mongodb://localhost/posts',
  { useMongoClient: true }
)
const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  author: {
    type: String,
    default: ''
  },
  createdOn: {
    type: Date,
    default: Date.now,
  }
})

module.exports = connect.model('BlogPost', BlogPostSchema);
