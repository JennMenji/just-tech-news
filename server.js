const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
// Set up handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

// set up handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening."));
});
