const cheerio = require("cheerio");
const request = require("request");

const URL = "https://www.nytimes.com/section/sports#latest-panel";

module.exports = function(app) {
  app.get("/scraper", (req, res) => {
    request.get(URL, (error, response, body) => {
      if (error) throw error;
      // console.log("response: ", response);
      // console.log("body: ", body);
      let $ = cheerio.load(body);
      let data = [];
      $(".story-body").each(function(i, story) {
        let headline = $(story)
          .find(".headline")
          .text();
        let summary = $(story)
          .find(".summary")
          .text();
        let link = $(story)
          .find(".story-link")
          .attr("href");
        if (link) {
          data.push({ headline, summary, link });
        }
      });
      res.send(data);
    });
  });
};
