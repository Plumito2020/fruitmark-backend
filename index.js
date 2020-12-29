const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const stockRouter = require("./routes/stock");

// ---- Parsing the incoming requests
app.use(bodyParser.json());

// ---- To avoid CORS errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ---- Setting up middlewares
app.use("/", stockRouter);

// Error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.statusCode || 500,
      message: err.message,
    },
  });
});

mongoose
  .connect(
    "mongodb+srv://zakaria:zakaria@cluster0.0al6x.mongodb.net/fruit?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => app.listen(5000))
  .catch((err) => console.log("[ERROR MONGO]", err));
