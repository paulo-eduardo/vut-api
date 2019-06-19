const express = require('express')

const AuthController = require('./controllers/Auth')

const routes = new express.Router()

routes.get('', (req, res) => {
  return res.status(200).json({ message: 'Server is up' })
})

routes.post('/register', AuthController.register)

module.exports = routes
