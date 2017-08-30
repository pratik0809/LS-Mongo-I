const express = require('express')
const mongoose = require('mongoose')
const User = require('./models.js')
const BlogPost = require('./post_models.js')
const bodyParser = require('body-parser')

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const STATUS_NOT_FOUND = 404;
const server = express();
const port = 3000;
console.log(`Server Listening on ${port}`);

server.listen(port);

server.use(bodyParser.json());

/*
*     User Routes
*/
server.get('/users', (req, res) => {
    User.find({}, (err, data) => {
      if(err) {
        res.status(STATUS_NOT_FOUND);
        return res.json({ error: "No users found"})
      }
      return res.json(data)
    })
});


server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    User.findById(id, (err, found) => {
      if(err) {
        res.status(STATUS_NOT_FOUND);
        return res.json({ error: "User not found" });
      }
      res.json(found);
    });
});


server.post('/users', (req, res) => {
  const newUser = req.body.username;
  if (!newUser) {
    res.status(STATUS_USER_ERROR);
    return res.json({ error: "Please provide a user" });
  }
  const user = new User ({ "username": newUser});
  user.save((err) => {
    if(err) {
      return res.json(err);
    }
    return res.json(user);
  })
});

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    User.findByIdAndRemove(id, (err, found) => {
      if(err) {
        res.status(STATUS_NOT_FOUND);
        return res.json({ "error": "User not found" });
      }
      return res.json(found);
    });
});

/*
*     Blog Post Routes
*/

server.get('/posts', (req, res) => {
    BlogPost.find({}, (err, data) => {
      if(err) {
        res.status(STATUS_NOT_FOUND);
        return res.json({ error: "No post found"})
      }
      return res.json(data)
    })
});

server.post('/posts', (req, res) => {
  const {title, body, author } = req.body;
  if (!title || !author) {
    res.status(STATUS_USER_ERROR);
    return res.json({ error: "Please provide a title and author" });
  }
  const post = new BlogPost ({
    title,
    body,
    author
  });
  post.save((err) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR)
      return res.json(err);
    }
    return res.json(post);
  })
});

server.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    BlogPost.findById(id, (err, found) => {
      if(err) {
        res.status(STATUS_NOT_FOUND);
        return res.json({ error: "Post not found" });
      }
      res.json(found);
    });
});

server.delete('/posts/:id', (req, res) => {
    const {id} = req.params;
    BlogPost.findByIdAndRemove(id, (err, found) => {
      if(err) {
        res.status(STATUS_NOT_FOUND);
        return res.json({ "error": "Post not found" });
      }
      return res.json({
        "success": "deleted"
      });
    });
});
