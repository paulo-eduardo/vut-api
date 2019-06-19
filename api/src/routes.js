const express = require('express')

const AuthMiddleware = require('./middleware/Auth')

const AuthController = require('./controllers/Auth')
const ToolController = require('./controllers/Tool')

const routes = new express.Router()

routes.get('', (req, res) => {
  return res.status(200).json({ message: 'Server is up' })
})

routes.post('/register', AuthController.register)
routes.post('/oauth/token', AuthController.sigin)

routes.get('/tools', AuthMiddleware, ToolController.index)

module.exports = routes
