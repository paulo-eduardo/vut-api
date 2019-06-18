const express = require('express')

const routes = new express.Router()

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is up' })
})

module.exports = routes
