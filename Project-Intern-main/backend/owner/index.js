require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("routes/api");
const { swaggerUIServe,swaggerUISetup } = require("kernels/api-docs");
const cors = require('cors');
const path = require('path');
const uploadRouter = require('./modules/uploads/uploadRouter');


const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(bodyParser.json());
app.use("/", [], router);
app.use(express.json());

app.use("/api-docs", swaggerUIServe, swaggerUISetup);

app.use('/owner/public/uploads', express.static(path.join(__dirname, '../owner/public/uploads')));
app.use('/upload', uploadRouter);

module.exports = app