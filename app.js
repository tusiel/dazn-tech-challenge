const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");
const routes = require("./routes");

const app = express();

/** Recommended Mongoose settings to prevent depreciation warnings */
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);

mongoose.connection.on("error", error => {
  console.log(`An error occurred while connecting to the database: ${error}`);
});

mongoose.connection.on("connected", () => {
  console.log("Database connection established successfully");
});

app.use(routes);

module.exports = app;
