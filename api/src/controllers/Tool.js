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
  },

  findId (req, res) {
    Tool.findById(req.params.id, (error, tool) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        })
      }

      return res.status(200).json(tool)
    })
  },

  update (req, res) {
    Tool.findById(req.params.id, (error, tool) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        })
      }

      tool.title = req.body.title || tool.title
      tool.link = req.body.link || tool.link
      tool.description = req.body.description || tool.description
      tool.tags = req.body.tags || tool.tags

      tool.save((error, tool) => {
        if (error) {
          return res.status(400).json({
            code: 400,
            message: 'Wrong credentials!',
            description: error
          })
        }

        return res.status(200).json(tool)
      })
    })
  },

  delete (req, res) {
    Tool.deleteOne({ _id: req.params.id }, error => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        })
      }

      return res.status(200).json({ message: `Removed tool: ${req.params.id}` })
    })
  },

  findTags (req, res) {
    const tags = req.query.tags.split(',')
    console.log('deveria ter entrado aqui =>', tags)
    return res.status(200).json({ message: `Removed tool: ${req.params.id}` })
  }
}
