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
  app.get("/article/saved", (req, res) => {
    db.Article.find({ saved: true }, (err, articles) => {
      if (err) throw err;
      res.render("saved", { articles });
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

  app.delete("/article/:id", (req, res) => {
    db.Article.deleteOne({ _id: req.params.id }, (err, status) => {
      if (err) throw err;
      res.redirect("/article/saved");
    });
  });

  //get notes
  app.get("/article/:id/note", (req, res) => {
    db.Article
      .findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  //add notes
  app.post("/article/:id/note", (req, res) => {
    console.log(
      `add note post route. id: ${req.params.id} body: ${req.body.note}`
    );
    // Create a new note and pass the req.body to the entry
    db.Note
      .create({ body: req.body.note })
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate(
          {
            _id: req.params.id
          },
          {
            note: dbNote._id
          },
          {
            new: true
          }
        );
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.delete("/article/:articleid/note/:noteid", (req,res)=> {
    db.Note.deleteOne({ _id: req.params.noteid }, (err, status) => {
      if (err) throw err;
      res.redirect("/article/saved");
    });
  })
};
