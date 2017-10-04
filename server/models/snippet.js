const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/codeSnippetsReact");

const snippetSchema = new Schema({
  username: {
    type: String, lowercase: true, required: true
  },
  title: {
    type: String, unique: true, lowercase: true, required: true
  },
  code: {
    type: String,
    required: true
  },
  notes: String,
  language: {
    type: String, required: true,
  },
  tags: [String]
});

module.exports = mongoose.model('Snippet', snippetSchema);
