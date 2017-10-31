const mongoose = require("mongoose");

// Require all models
var db = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperhomework";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

module.exports = function(app) {
  app.get("/", (req, res) => {
    db.Article.find({ saved: false }, (err, articles) => {
      if (err) throw err;
      // console.log(typeof articles);
      // res.json(articles);
      res.render("index", { articles });
    });
  });
};
