require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("routes/api");
const { swaggerUIServe, swaggerUISetup } = require("kernels/api-docs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set("layout", "layouts/index");
app.set("views", path.join(__dirname, "views/layouts"));
// app.set("view engine", "ejs");

// TODO: static files (các file này chủ yếu là css, js, images)
// app.use(express.static(path.join(__dirname, "public/uploads")));

app.use(bodyParser.json());
app.use("/", [], router);
app.use(express.json());
app.use(cookieParser());


// todo: swagger
app.use("/api-docs", swaggerUIServe, swaggerUISetup);

module.exports = app;
