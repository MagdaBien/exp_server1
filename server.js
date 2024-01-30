const hbs = require("express-handlebars");
const express = require("express");
const path = require("path");

const app = express();
app.engine(".hbs", hbs());
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("index", { layout: "main_dark" });
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/hello/:name", (req, res) => {
  res.render("hello", { name: req.params.name });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/info", (req, res) => {
  res.render("info");
});

app.get("/history", (req, res) => {
  res.render("history");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/user", (req, res, next) => {
  res.render("register");
});

app.use((req, res) => {
  res.render("error404");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
