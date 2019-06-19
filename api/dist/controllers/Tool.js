const Tool = require('../models/Tool');

module.exports = {
  index(req, res) {
    Tool.find({}, (error, tools) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        });
      }

      return res.status(200).json(tools);
    });
  },

  store(req, res) {
    Tool.create(req.body, (error, tool) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        });
      }

      return res.status(201).json(tool);
    });
  },

  findId(req, res) {
    Tool.findById(req.params.id, (error, tool) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        });
      }

      return res.status(200).json(tool);
    });
  },

  update(req, res) {
    Tool.findById(req.params.id, (error, tool) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        });
      }

      tool.title = req.body.title || tool.title;
      tool.link = req.body.link || tool.link;
      tool.description = req.body.description || tool.description;
      tool.tags = req.body.tags || tool.tags;

      tool.save((error, tool) => {
        if (error) {
          return res.status(400).json({
            code: 400,
            message: 'Wrong credentials!',
            description: error
          });
        }

        return res.status(200).json(tool);
      });
    });
  },

  delete(req, res) {
    Tool.deleteOne({ _id: req.params.id }, error => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        });
      }

      return res.status(200).json({ message: `Removed tool: ${req.params.id}` });
    });
  },

  findTags(req, res) {
    const tags = req.query.tags.split(',');

    Tool.find({ tags: { $all: tags } }, (error, tools) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        });
      }

      return res.status(200).json(tools);
    });
  }
};
//# sourceMappingURL=Tool.js.map