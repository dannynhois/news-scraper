const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");

const app = express();
const PORT = process.env.PORT || 3000;

//require routes
require("./controllers/scraper")(app);;
app.get("/", (req, res) => {
  res.send("home route");
});

app.listen(PORT, () => {
  console.log("Listening on http://localhost:" + PORT);
});
