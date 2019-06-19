const User = require('../../src/models/User')
const Tool = require('../../src/models/Tool')

module.exports = {
  async truncateUser () {
    // should remove all logins

    await User.deleteOne({ name: 'Nay' })
  },

  async truncateTools () {
    // should remove all tools

    await Tool.deleteMany({})
  }
}
