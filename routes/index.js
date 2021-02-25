const express = require("express");
const Router = express.Router();

Router.use("/files", require("./filesRouter"));

module.exports = Router;
