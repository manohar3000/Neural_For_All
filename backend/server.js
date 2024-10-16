require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const modelRoutes = require('./routes/models')
const userRoutes = require('./routes/user')

// express app
const app = express()

// Allow all origins
app.use(cors());

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/models', modelRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })