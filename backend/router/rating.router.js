const express = require("express");
const Rating_router = express.Router();
const RatingController = require("./../Controller/rating/rating");
const tokenMiddleware = require("../middleware/token.middleware");

Rating_router.post("/Rating", tokenMiddleware, RatingController.Rating);

Rating_router.get(
  "/show_avg_rating",
  tokenMiddleware,
  RatingController.show_avg_rating
);

module.exports = Rating_router;
