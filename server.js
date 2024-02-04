const hbs = require("express-handlebars");
const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const app = express();
app.engine(".hbs", hbs());
app.set("view engine", ".hbs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid mime type"));
    }
  },
});

const uploadSingleImage = upload.single("design");

app.get("/", (req, res) => {
  res.render("index");
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

app.post("/contact/send-message", function (req, res) {
  uploadSingleImage(req, res, function (err) {
    const { author, sender, title, message } = req.body;

    if (err) {
      return res.render("contact", { isError2: true });
    }

    if (author && sender && title && message && req.file) {
      res.render("contact", {
        isSent: true,
        fileName: req.file.originalname,
      });
    } else {
      res.render("contact", { isError: true });
    }
  });
});

app.use((req, res) => {
  res.render("error404");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
