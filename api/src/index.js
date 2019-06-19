const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const debug = require('debug')('server:debug')

mongoose.connect(config.get('database'), {
  useNewUrlParser: true
})

// callback when connection to mongodb is open
mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log(req.query.tags)
  next()
})
app.use('/v1', require('./routes'))

const listen = app.listen(config.get('port'), () => {
  debug(
    `server is running on port ${config.get('port')} and in ${config.get(
      'name'
    )} mode`
  )
  console.log(
    `server is running on port ${config.get('port')} and in ${config.get(
      'name'
    )} mode`
  )
})

module.exports = app
module.exports.port = listen.address().port
