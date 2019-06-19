const User = require('../models/User')

module.exports = {
  async register (req, res) {
    User.create(req.body, (error, user) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        })
      }

      return res.status(201).json({ message: 'Login created' })
    })
  }
}
