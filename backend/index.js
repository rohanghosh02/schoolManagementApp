const serverless = require("serverless-http");
const express = require("express");
const route = require("./router/routes");
const FeesRouter = require("./router/feesRoute");
const contentRoute = require("./router/contentRoute");
const Rating_router = require("./router/rating.router");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", route);
app.use("/", FeesRouter);
app.use("/", contentRoute);
app.use("/", Rating_router);

module.exports.handler = serverless(app);
