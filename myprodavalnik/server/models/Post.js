const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    // ref: 'User',
    required: true
  },
  phone:{
    type: String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('Post', postSchema);