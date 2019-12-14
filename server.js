require('dotenv').config();

const express = require("express");
const path = require("path");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.set("db", require("./db"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
