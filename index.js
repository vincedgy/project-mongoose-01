const mongoose = require('mongoose');
const mongo_user= process.env.MONGO_USER
const mongo_password = process.env.MONGO_PASSWORD

mongoose.connect('mongodb+srv://'+ mongo_user+':' + mongo_password + '@cluster0.fydqtzw.mongodb.net/perlettes');

const Users = mongoose.model('users', new mongoose.Schema());

Users.find().exec().then( r => {
  console.log(r)
})
