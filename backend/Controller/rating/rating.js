// require for password encrypting
//require json web token for signup authentication
const jwt = require("jsonwebtoken");
const ratingServices = require("../../Services/rating.Service");
const validators = require("../../validators/ratings/ratings");
const connection = require("./../../models");
const sequelize = connection.sequelize;
const bodyparser = require("body-parser");
const constants = require("./../../constants/en");

const RatingController = {
  Rating: async (req, res) => {
    let data = req.body;
    let { teacherId, points } = data;
    let token = res.userData;
    let response = {};
    try {
      let validatorResult = await validators.ratingsValid(data);
      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      let checkUser = await ratingServices.checkUser(token);
      if (!checkUser) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.message = constants.USER_ID_NOT_EXIST;
        return res.json(response).status(response.status);
      }
      let check_Teacher = await ratingServices.find_TeacherId(data);
      if (!check_Teacher) {
        response.status = constants.RECORD_NOT_FOUND;
        response.message = constants.TEACHER_ID_NOT_EXIST;
        return res.json(response).status(response.status);
      }
      let insert_data = {
        teacherId: data.teacherId,
        userId: token.id,
        points: data.points,
      };
      let checkRate = await ratingServices.Find_rating(insert_data);
      if (checkRate) {
        let update_ratings = await ratingServices.updateRating(insert_data);
        response.message = constants.SUCCESS;
        response.status = constants.SUCCESS_STATUS_CODE;
        return res.json({ response }).status(response.status);
      }
      let result = await ratingServices.create(insert_data);
      response.message = constants.SUCCESS;
      response.status = constants.SUCCESS_STATUS_CODE;
      return res.json({ response, result }).status(response.status);
    } catch (error) {
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      console.log(error);
      return res.json(response).status(response.status);
    }
  },
  show_avg_rating: async (req, res) => {
    let token = res.userData;
    let data = req.query;
    let { teacherId } = data;
    let response = {};
    try {
      let validatorResult = await validators.Valid(data);
      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let checkUser = await ratingServices.check_Users(token);
      if (!checkUser) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.message = constants.USER_ID_NOT_EXIST;
        return res.json(response).status(response.status);
      }
      let check_Teacher = await ratingServices.find_TeacherId(data);
      if (!check_Teacher) {
        response.status = constants.RECORD_NOT_FOUND;
        response.message = constants.TEACHER_ID_NOT_EXIST;
        return res.json(response).status(response.status);
      }

      let result = await ratingServices.get_avg_rating(data);
      response.message = constants.SUCCESS;
      response.status = constants.SUCCESS_STATUS_CODE;
      return res.json({ response, result }).status(response.status);
    } catch (error) {
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      console.log(error);
      return res.json(response).status(response.status);
    }
  },
};

module.exports = RatingController;
