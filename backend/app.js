require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");

const server = express();

//Middleware
server.use(express.json());
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(cors({ origin: "*" }));

const dbURI = process.env.dbURI;
const db = mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    server.listen(process.env.PORT);
    console.log("connected to database...");
  })
  .catch((err) => console.log(err));

server.use(routes);
