const mongoose = require('mongoose');

const Tool = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  tags: [String]
});

module.exports = mongoose.model('Tool', Tool);
//# sourceMappingURL=Tool.js.map