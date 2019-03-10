const mongoose = require('mongoose');
const User =require('../models/User')
mongoose.Promise = global.Promise;
module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/myprodavalnik', {
        useNewUrlParser: true
    });       
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        } 
        User.seedAdminUser()
        console.log('Database ready');
    });

    db.on('error', reason => {
        console.log(reason);
    });
};