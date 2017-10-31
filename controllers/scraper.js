const cheerio = require("cheerio");
const request = require("request");
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

const URL = "https://www.nytimes.com/section/sports#latest-panel";

module.exports = function(app) {
  app.get("/scraper", (req, res) => {
    request.get(URL, (error, response, body) => {
      if (error) throw error;
      // console.log("response: ", response);
      // console.log("body: ", body);
      const $ = cheerio.load(body);
      const stories = [];
      let count = 0;
      $(".story-body").each(function(i, story) {
        const headline = $(story)
          .find(".headline")
          .text();
        const summary = $(story)
          .find(".summary")
          .text();
        const link = $(story)
          .find(".story-link")
          .attr("href");
        if (link) {
          stories.push({headline, summary,link});
        }
      });
      db.Article
        .insertMany(stories)
        .then(dbArticle => {
          res.redirect("/");
        })
        .catch(err => {
            res.redirect("/");
        });
    });
  });
};
