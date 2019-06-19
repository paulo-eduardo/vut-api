const express = require('express')

const AuthMiddleware = require('./middleware/Auth')

const AuthController = require('./controllers/Auth')
const ToolController = require('./controllers/Tool')

const routes = new express.Router()

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is up' })
})

routes.post('/register', AuthController.register)
routes.post('/oauth/token', AuthController.sigin)

routes.get('/tools', AuthMiddleware, ToolController.index)
routes.post('/tools', AuthMiddleware, ToolController.store)
routes.get('/tool', AuthMiddleware, ToolController.findTags)
routes.get('/tool/:id', AuthMiddleware, ToolController.findId)
routes.put('/tool/:id', AuthMiddleware, ToolController.update)
routes.delete('/tool/:id', AuthMiddleware, ToolController.delete)

module.exports = routes
