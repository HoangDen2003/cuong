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
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:4200", // Thay thế bằng URL của client
  credentials: true, // Đảm bảo rằng cookie được gửi cùng với yêu cầu
};
app.use(cors(corsOptions));

app.use(expressLayouts);
app.set("layout", "layouts/index");
app.set("views", path.join(__dirname, "views/layouts"));
app.set("view engine", "ejs");

// user css, js
app.use(express.static(path.join(__dirname, "public/uploads")));

app.use(bodyParser.json());
app.use("/", [], router);
app.use(express.json());
app.use(cookieParser());

// todo: swagger
app.use("/api-docs", swaggerUIServe, swaggerUISetup);

module.exports = app;
