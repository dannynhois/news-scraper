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
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
