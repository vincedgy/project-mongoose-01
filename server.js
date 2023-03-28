require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection
const Users = mongoose.model('users', new mongoose.Schema());
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

// API Initialisation
const app = express()
app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(3000, () => {
  console.log("Starting server")
})



