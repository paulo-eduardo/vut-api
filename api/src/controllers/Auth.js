const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
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
  },

  async sigin (req, res) {
    const { email, password } = req.body

    User.findOne({ email }, (error, user) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: error
        })
      }

      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (error) {
            return res.status(400).json({
              code: 400,
              message: 'Wrong credentials!',
              description: error
            })
          }

          if (same) {
            let token = jwt.sign({ id: user._id }, config.get('secret'), {
              expiresIn: 60 * 60
            })

            res.status(200).json({
              token_type: 'Bearer',
              expires_in: 3600,
              access_token: token
            })
          } else {
            return res.status(400).json({
              code: 400,
              message: 'Wrong credentials!',
              description: 'Wrong password!'
            })
          }
        })
      } else {
        return res.status(400).json({
          code: 400,
          message: 'Wrong credentials!',
          description: 'Wrong email!'
        })
      }
    })
  }
}
