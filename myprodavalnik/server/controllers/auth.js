const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');

function validateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Въведените данни са грешни или непълни!',
      errors: errors.array()
    });
    
    return false;
  }

  return true;
}

module.exports = {
  signUp: (req, res) => {
    if (validateUser(req, res)) {
      const { email, password, name } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);
      User.create({ 
        email,
        hashedPassword,
        name,
        salt
      }).then((user) => {
        const token = jwt.sign({ 
          email: user.email,
          userId: user._id.toString(),
          name:user.name
        }
        , 'somesupersecret'
        , { expiresIn: '1h' });
        
        res.status(201)
          .json({ message: 'Вие се регистрирахте успешно!',
          token, 
             userId: user._id.toString(),
           name: user.name,
          role:user.role });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
    }
  },
  signIn: (req, res,next) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          const error = new Error('Грешен имейл !');
          error.statusCode = 401;
          throw error;
        }

        if(!user.authenticate(password)) {
          const error = new Error('Грешена парола');
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({ 
          email: user.email,
          userId: user._id.toString(),
          name:user.name
        }
        , 'somesupersecret'
        , { expiresIn: '1h' });

         res.status(200).json(
           { 
             message: 'Вие влязохте успешно!', 
             token, 
             userId: user._id.toString(),
             name :user.name,
             role:user.role
           });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  }
}