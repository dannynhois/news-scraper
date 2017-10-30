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
  app.get("/article/:id", (req, res) => {
    db.Article.find({}, (err, articles) => {
      if (err) throw err;
      // console.log(typeof articles);
      // res.json(articles);
      res.render("index", articles);
    });
  });

  //update from unsaved to saved
  app.post("/article/:id", (req, res) => {
    console.log("post article route: ", req.params.id);
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }, { new: true }, (err, doc)=> {
        if (err) throw err;
        console.log("before redirect");
        res.redirect("/");
    });
  });
};
