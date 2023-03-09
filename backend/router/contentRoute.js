const express = require("express");
const contentRoute = express.Router();
const tokenMiddleware = require("../middleware/token.middleware");
const Content_controller = require("../Controller/content/content.controller");

contentRoute.post(
  "/Create_Post",
  tokenMiddleware,
  Content_controller.Create_Post
);
contentRoute.post("/Post_like", tokenMiddleware, Content_controller.Post_like);
contentRoute.post(
  "/PostComment",
  tokenMiddleware,
  Content_controller.PostComment
);
contentRoute.post(
  "/deleteComment",
  tokenMiddleware,
  Content_controller.deleteComment
);

module.exports = contentRoute;
