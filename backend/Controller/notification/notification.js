const notificationService = require("../../services/notification.service");
const constants = require("../../constants/en");

const notification = {
  /*
   *  list
   */
  list: async (req, res) => {
    let userInfo = res.locals.userData;
    const limit = req.query.limit ? parseInt(req.query.limit) : 40;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const search = req.query.search ? req.query.search : "";
    const status = req.query.status ? req.query.status : "";

    let response = {};
    try {
      let data = {
        limit,
        offset,
        search,
        status,
        userId: userInfo.id,
      };

      let result = await notificationService.list(data);
      let count = await notificationService.count(data.userId);
      if (result.length < 1) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }

      response.count = count;
      response.results = result;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: notificationService.list failed.", err);
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      response.err = err.parent.sqlMessage;
      return res.json(response);
    }
  },
};
module.exports = notification;
