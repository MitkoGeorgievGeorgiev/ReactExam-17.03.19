const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  hashedPassword: {
    type: Schema.Types.String,
    required: true
  },
  name: {
    type: Schema.Types.String,
    
  },
  salt: {
    type: Schema.Types.String,
    required: true
  },
  posts: [
    { type: Schema.Types.ObjectId, ref: 'Post' }
  ],
  role:{type:String}
}
);

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  }
})


const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, 'Admin');
    return User.create({
      username: 'Admin',
      email: 'Admin@gmail.com',
      salt,
      hashedPassword,
      role: 'Admin'
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = User
