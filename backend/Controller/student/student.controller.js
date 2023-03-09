const userCtrl = require("../../Controller/users/user.controller");
const studentServices = require("../../Services/student.service");
const studentController = {
  signup: async (req, res) => {
    const role = "student";
    let response = {};

    try {
      await userCtrl.addUser(req, res, role);
    } catch (error) {
      console.log("error", "try-catch: studentService.signup failed.", error);
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  login: async (req, res) => {
    let response = {};

    try {
      await userCtrl.loginUser(req, res);
    } catch (error) {
      console.log("error", "try-catch: studentService.login failed.", error);
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  viewFees: async (req, res) => {},
  checkResult: async (req, res) => {
    let { registrationId } = res.userData;
    let result = await studentServices.checkResult(registrationId);
    // console.log(result.length);
    if (result.length == 0) {
      return res.json({ result: "Marks is not uploaded at portal....." });
    }
    return res.json({ marks: result });
  },
};
module.exports = studentController;
