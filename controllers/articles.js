const mongoose = require("mongoose");

// Require all models
var db = require("../models");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scraperhomework", {
  useMongoClient: true
});

module.exports = function(app) {
  app.get("/article/saved", (req, res) => {
    db.Article.find({ saved: true }, (err, articles) => {
      if (err) throw err;
      res.render("saved", {articles})
    });
  });

  app.get("/article/:id", (req, res) => {
    db.Article.find({}, (err, articles) => {
      if (err) throw err;
      res.render("index", articles);
    });
  });

  //update from unsaved to saved
  app.post("/article/:id", (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { saved: true },
      { new: true },
      (err, doc) => {
        if (err) throw err;
        res.send(doc);
      }
    );
  });

  app.delete("/article/:id", (req,res) => {
    db.Article.deleteOne({_id:req.params.id}, (err, status) => {
      if (err) throw err
      res.redirect("/article/saved");
    })
  })
};
