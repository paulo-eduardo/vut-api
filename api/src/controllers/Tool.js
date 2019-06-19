const Tool = require('../models/Tool')

module.exports = {
  async index (req, res) {
    try {
      const tools = await Tool.find({})
      res.status(200).send(tools)
    } catch (error) {
      res.status(400).send({ message: 'Internal server error' })
    }
  }
}
