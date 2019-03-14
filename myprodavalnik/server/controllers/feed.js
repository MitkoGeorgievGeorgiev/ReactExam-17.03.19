const { validationResult } = require('express-validator/check');
const Post = require('../models/Post');
const User = require('../models/User');

function validatePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });

    return false;
  }

  return true;
}

module.exports = {
  getPosts: (req, res) => {
    // Retrieve all posts in JSON format
    Post.find()
      .then((posts) => {
        res
          .status(200)
          .json({ message: 'Fetched posts successfully.', posts });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  getUser: (req, res) => {
    const id = req.params.id
    User.findById(id).populate('posts')
      .then(user => {
        res.status(200)
          .json({ message: 'User fetched.', user })

      }).catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

      })
  },
  createPost: (req, res, next) => {
    // Validate post using express-validator
    // Return 422 with errors array if something went wrong
    if (validatePost(req, res, next)) {
      const { title, content, image, price, author, phone } = req.body;


      // Create the post in DB and return 201 status code with a message and the post itself with the creator
      const post = new Post({ title, content, image, price, author, phone });


      post.save()
        .then(() => {
          return User.findById(req.userId);
        })
        .then((user) => {
          user.posts.push(post);
          creator = user;
          return user.save();
        })
        .then(() => {
          res
            .status(201)
            .json({
              message: 'Успешно добавена обява!',
              success: true,
              post: post,
              creator: { userId: req.userId, name: creator.name }
            })
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          next(error);
        });
    }
  },
  deletePost: (req, res, next) => {
    const postId = req.params.postId;

    Post.findById(postId)
      .then((post) => {
        if (!post) {
          const error = new Error('Post not found!');
          error.statusCode = 404;
          throw error;
        }

        // if (post.creator.toString() !== req.userId) {
        //   const error = new Error('Unauthorized');
        //   error.statusCode = 403;
        //   throw error;
        // }

        return Post.findByIdAndDelete(postId);
      })
      .then(() => {
        return User.findById(req.userId);
      })
      .then((user) => {
        user.posts.pull(postId);
        return user.save();
      })
      .then(() => {
        res.status(200)
          .json({
            message: 'Успешно изтриване на обявата!'
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  getPostById: (req, res) => {
    const postId = req.params.postId;

    Post.findById(postId)
      .then((post) => {
        res
          .status(200)
          .json({ message: 'Post fetched.', post })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  updatePost: (req, res, next) => {
    // Validate post using express-validator
    // Return 422 with errors array if something went wrong


    if (validatePost(req, res, next)) {
      const postId = req.params.postId;
      const post = req.body;


      Post.findById(postId)
        .then((p) => {
          if (!p) {
            const error = new Error('Post not found');
            error.statusCode = 404;
            throw error;
          }
          p.title = post.title;
          p.content = post.content;
          p.image = post.image
          p.author = post.author
          p.phone = post.phone
          p.price = post.price
          return p.save();
        })
        .then((p) => {
          if (p) {
            res.status(200).json({
              success: true,
              message: 'Успешно редактирахте обявата!',
              post: p
            })
          }
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          next(error);
        });
    }
  }
}