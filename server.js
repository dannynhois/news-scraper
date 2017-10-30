const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

/**
   * Set Handlebars as View Engine
   */
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/**
 * For Body Parser
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//method override for put and delete
app.use(methodOverride("_method"));

//require routes
require("./controllers/index")(app);
require("./controllers/articles")(app);
require("./controllers/scraper")(app);

app.listen(PORT, () => {
  console.log("Listening on http://localhost:" + PORT);
});
