const Tool = require('../models/Tool')

module.exports = {
  async index (req, res) {
    try {
      const tools = await Tool.find({})
      res.status(200).send(tools)
    } catch (error) {
      res.status(400).send({ message: 'Internal server error' })
    }
  },

  store (req, res) {
    Tool.create(req.body, (error, tool) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        })
      }

      return res.status(201).json(tool)
    })
  }
}
