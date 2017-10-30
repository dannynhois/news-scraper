var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String
  },
  summary: String,
  link: {
    type: String,
    unique: true
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
