const User = require('../../src/models/User')

module.exports = {
  async truncateUser () {
    // should remove all logins

    await User.deleteOne({ name: 'Nay' })
  }
}
