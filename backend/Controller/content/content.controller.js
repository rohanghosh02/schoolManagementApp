const validators = require("../../validators/content/post");
const ContentService = require("../../Services/content.service");
const constants = require("../../constants/en");
const jwtUtility = require("../../utilities/jwt.utilities");
const bcrypt = require("bcrypt");
var moment = require("moment");
const tokenMiddleware = require("../../middleware/token.middleware");

const Content_controller = {
  Create_Post: async (req, res) => {
    let token = res.userData;

    let insert_data = req.body;
    let { title, Image, description } = insert_data;
    let response = {};
    try {
      if (token.role === "student") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let validatorResult = await validators.create_Post(insert_data);
      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      ///<--only admin and teacher can post-->//

      if (token.role === "admin") {
        let insert_data = {
          Title: title,
          Image: Image,
          Description: description,
          UserId: token.id,
          isAdmin: "yes",
        };
        const Result = await ContentService.createPost(insert_data);
        response.message = constants.POST_CREATED;
        response.status = constants.SUCCESS_STATUS_CODE;
        return res.json({ response, Result }).status(response.status);
      }
      if (token.role == "teacher") {
        let insert_data = {
          Title: title,
          Image: Image,
          Description: description,
          UserId: token.id,
        };
        const Result = await ContentService.createPost(insert_data);
        response.message = constants.POST_CREATED;
        response.status = constants.SUCCESS_STATUS_CODE;
        return res.json({ response, Result }).status(response.status);
      }
    } catch (error) {
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      console.log(error);
      return res.json(response).status(response.status);
    }
  },

  Post_like: async (req, res) => {
    let token = res.userData;
    let data = req.body;
    let { PostId } = data;
    let response = {};
    try {
      let validatorResult = await validators.like_Post(data);
      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let Post = await ContentService.Find_post(data);
      if (!Post) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.POST_NOT_FOUND;
        return res.json(response).status(response.status);
      }

      let insert_data = {
        PostId: PostId,
        UserId: token.id,
      };
      console.log(insert_data);
      let find = await ContentService.find_like(insert_data);
      if (find) {
        await ContentService.like_destroy(insert_data);
        response.message = constants.UnLiked;
        let count = await ContentService.likes_count(insert_data);
        let update = await ContentService.update_likes(insert_data, count);
        return res.json(response);
      } else {
        await ContentService.like_create(insert_data);
        response.message = constants.POST_LIKED;
        res.json(response);
      }
      let count = await ContentService.likes_count(insert_data);
      let update = await ContentService.update_likes(insert_data, count);
      return update;
    } catch (error) {
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      console.log(error);
      return res.json(response);
    }
  },

  PostComment: async (req, res) => {
    let token = res.userData;
    let insert_data = req.body;
    let response = {};
    let { PostId, comment } = insert_data;
    try {
      let validatorResult = await validators.Post_comment(insert_data);
      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let check = await ContentService.FindUser(token);
      if (!check) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.NO_USERS_FOUND;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let Find_Post = await ContentService.FindPost(insert_data);

      if (!Find_Post) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.RECORD_NOT_FOUND;
        return res.json(response).status(response.status);
      }
      if (Find_Post && check) {
        let insert_data = {
          PostId: PostId,
          comment: comment,
          UserId: token.id,
        };
        let result = await ContentService.CreateComment(insert_data);
        let counts = await ContentService.Count_comment(insert_data);
        let updates = await ContentService.update_comment(insert_data, counts);

        if (result && Find_Post.UserId != token.id) {
          let message;
          message = `${token.id} has commented on your post `;
          response.status = constants.SUCCESS_STATUS_CODE;
          return res.json({ message, result }).status(response.status);
        } else {
          return res.send({
            message: "you have commented on post!",
            result: result,
          });
        }
      }
    } catch (error) {
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      console.log(error);
      return res.json(response).status(response.status);
    }
  },

  deleteComment: async (req, res) => {
    let token = res.userData;
    let data = req.body;
    let { PostId, commentId } = data;
    let response = {};
    try {
      let validatorResult = await validators.delete_comment(data);
      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let insert_data = {
        PostId,
        commentId,
      };
      let check = await ContentService.FindPostAndUser(insert_data, token);
      if (!check) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.RECORD_NOT_FOUND;
        return res.json(response).status(response.status);
      } else {
        let destroys = await ContentService.Delete_comment(insert_data);
        let counts = await ContentService.Count_comment(insert_data);
        let updates = await ContentService.update_comment(insert_data, counts);
        response.status = constants.SUCCESS_STATUS_CODE;
        return res.send({ message: "comment deleted successfully!", response });
      }
    } catch (error) {
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      console.log(error);
      return res.json(response).status(response.status);
    }
  },
};
module.exports = Content_controller;
