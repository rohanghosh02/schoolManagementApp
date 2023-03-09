const express = require("express");
const FeesRouter = express.Router();
const tokenMiddleware = require("../middleware/token.middleware");

const FeesController = require("../Controller/payments/fees.controller");

FeesRouter.post("/FeesPayment", tokenMiddleware, FeesController.FeesPayment);
module.exports = FeesRouter;
