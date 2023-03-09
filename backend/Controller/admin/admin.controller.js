const validators = require("../../validators/admin/admin");
const adminService = require("../../Services/admin.service");
const userCtrl = require("../../Controller/users/user.controller");
const constants = require("../../constants/en");
const jwtUtility = require("../../utilities/jwt.utilities");
const bcrypt = require("bcrypt");
const notificationService = require("../../Services/notification.service");
const moment = require("moment");
const { sendGrid } = require("../../middleware/sendMail");

const adminController = {
  signup: async (req, res) => {
    const role = "admin";
    const status = "active";
    let response = {};

    try {
      await userCtrl.addUser(req, res, role, status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.adminSignup failed.",
        error
      );
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
      console.log("error", "try-catch: adminController.login failed.", error);
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  logOut: async (req, res) => {
    let response = {};
    try {
      response.message = constants.USER_LOGOUT;
      response.LoginStatus = req.session.isLoggedIn;
      return res.json(response);
    } catch (error) {
      console.log("error", "try-catch: adminController.logOut failed.", error);
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  userList: async (req, res) => {
    let response = {};
    let status = req.query.status ? req.query.status : "active";
    let role = req.query.role ? req.query.role : "";
    let age = req.query.age;
    const limit = req.query.limit ? parseInt(req.query.limit) : 40;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const search = req.query.search ? req.query.search : "";
    const orderBy = req.query.orderBy ? req.query.orderBy : "id";
    const orderType = req.query.orderType ? req.query.orderType : "DESC";

    let userInfo = res.userData;
    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let stDOB, enDOB;
      if (age) {
        age = age.split("-").map((i) => Number(i));
        stDOB = moment().subtract(age[0], "years").format("YYYY-MM-DD");
        enDOB = moment().subtract(age[1], "years").format("YYYY-MM-DD");
      }

      let listData = {
        status,
        role,
        age,
        limit,
        offset,
        search,
        orderBy,
        orderType,
        id: userInfo.id,
        stDOB,
        enDOB,
      };

      const result = await adminService.userList(listData);

      if (result.length < 1) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }

      response.message = constants.SUCCESS;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.userList failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  verifyUser: async (req, res) => {
    const status = req.body.status ? req.body.status : "";
    const registrationId = req.body.registrationId
      ? req.body.registrationId
      : "";

    const userInfo = res.userData;
    let response = {};
    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let data = {
        status,
        registrationId,
      };

      let validatorResult = await validators.verifyUser(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      const findUserInfo = await adminService.findUser(registrationId);

      if (!findUserInfo) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.RECORD_NOT_FOUND;
        return res.json(response).status(response.status);
      }

      if (findUserInfo.status === "active") {
        response.message = constants.USER_ALREADY_VERIFIED;
        res.statusCode = constants.SUCCESS_STATUS_CODE;
        return res.json(response);
      }
      const result = await adminService.verifyUser(data);

      if (result) {
        let sgData = {
          email: findUserInfo.email,
          subject: "Your Account is verified ",
          text: `Your account for registrationId:${findUserInfo.registrationId}  is verified by admin now you can login to your account by email and password`,
          html: `<h1><strong>Your account for registrationId:${findUserInfo.registrationId}  is verified by admin now you can login to your account by email and password</strong></h1>`,
        };

        await sendGrid(sgData);
        let message, type;

        if (status === "active") {
          message = `user ${registrationId}  is verified `;
          type = "user_verified";
        }

        let sendDataToNotification = {
          type,
          userId: registrationId,
          message: message,
          actionId: userInfo.id,
          senderOwnerId: userInfo.registrationId,
        };
        //send notification
        await notificationService.sendNotification(sendDataToNotification);
      }

      response.message = constants.USER_VERIFIED;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.verifyUser failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  deleteUser: async (req, res) => {
    const reqData = req.body;
    const role = req.body.role ? req.body.role : "";
    const registrationId = req.body.registrationId
      ? req.body.registrationId
      : "";
    const userInfo = res.userData;
    let response = {};
    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let data = {
        role,
        registrationId,
      };
      let dataToValidate = {
        role,
        registrationId,
      };
      let validatorResult = await validators.deleteUser(dataToValidate);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      const findUserInfo = await adminService.findUser(registrationId, role);

      if (!findUserInfo) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.RECORD_NOT_FOUND;
        return res.json(response).status(response.status);
      }

      // if (findUserInfo.status === "active") {
      //   response.message = constants.USER_ALREADY_VERIFIED;
      //   res.statusCode = constants.SUCCESS_STATUS_CODE;
      //   return res.json(response);
      // }
      const result = await adminService.deleteUser(data, registrationId);

      response.message = constants.USER_DELETE;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.addStudentTeacher failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  AddClass: async (req, res) => {
    const userInfo = res.locals.userData;
    let Class = req.body.Class ? req.body.Class : "";
    let Section = req.body.Section ? req.body.Section : "";
    let TotalFees = req.body.TotalFees ? req.body.TotalFees : "";
    let Totalstudent = req.body.Totalstudent ? req.body.Totalstudent : "";
    let response = {};

    let data = {
      Class,
      Section,
      TotalFees,
      Totalstudent,
    };
    try {
      let validatorResult = await validators.class(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let isAdmin = await adminService.emailExist(userInfo.email);
      if (isAdmin) {
        let insertData = {
          adminId: userInfo.id,
          class: data.Class,
          Section: data.Section,
          TotalFees: data.TotalFees,
          Totalstudent: data.Totalstudent,
        };
        let createClass = await adminService.createClass(insertData);

        response.message = constants.CLASS_CREATED;
        response.status = constants.SUCCESS_STATUS_CODE;

        return res.json(response).status(response.status);
      } else {
        response.error = constants.NO_USERS_FOUND;
        response.status = constants.NOT_FOUND_STATUS_CODE;

        return res.json(response).status(response.status);
      }
    } catch (error) {
      console.log("error", "try-catch: adminController.login failed.", error);
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  addStudent: async (req, res) => {
    let reqData = req.body;
    let { registrationId, Class, branch, totalFees, status } = reqData;
    const role = "student";
    let response = {};
    const userInfo = res.userData;
    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let dataToValidate = {
        registrationId,
        Class,
        branch,
        totalFees,
      };
      let data = {
        enrollmentNo: registrationId,
        Class,
        branch,
        totalFees,
        dueFees: totalFees,
      };

      let validatorResult = await validators.addStudent(dataToValidate);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      const findUserInfo = await adminService.findUser(registrationId, role);

      if (!findUserInfo) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.RECORD_NOT_FOUND;
        return res.json(response).status(response.status);
      }
      const isStudent = await adminService.findStudent(registrationId);

      if (isStudent) {
        response.status = constants.ALREADY_EXIST_STATUS_CODE;
        response.error = constants.DATA_EXIST;
        return res.json(response).status(response.status);
      }

      if (status == "delete") {
        const data = { registrationId, role: "student" };
        let result = await adminService.deleteUser(data);
        response.message = constants.SUCCESS;
        res.statusCode = constants.SUCCESS_STATUS_CODE;
        response.results = result;
        return res.json(response);
      }

      let result = await adminService.addStudent(data);
      response.message = constants.SUCCESS;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response);
    } catch (error) {
      console.log(
        "error",
        "try-catch: userController.addStudent failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  addTeacher: async (req, res) => {
    let token = res.userData;
    let reqData = req.body;
    let { registrationId, salary, Class, branch, status } = reqData;
    const role = "teacher";
    let response = {};
    const userInfo = res.userData;
    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let data = {
        teacherId: registrationId,
        Class,
        branch,
        salary,
      };
      let dataToValidate = {
        registrationId,
        Class,
        branch,
        salary,
      };

      let validatorResult = await validators.addTeacher(dataToValidate);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      const findUserInfo = await adminService.findUser(registrationId, role);

      if (!findUserInfo) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.RECORD_NOT_FOUND;
        return res.json(response).status(response.status);
      }
      data.email = findUserInfo.email;
      const isTeacher = await adminService.findTeacher(registrationId);

      if (isTeacher) {
        response.status = constants.ALREADY_EXIST_STATUS_CODE;
        response.error = constants.DATA_EXIST;
        return res.json(response).status(response.status);
      }

      if (status == "delete") {
        const data = { registrationId, role: "teacher" };
        let result = await adminService.deleteUser(data);
        response.message = constants.SUCCESS;
        res.statusCode = constants.SUCCESS_STATUS_CODE;
        response.results = result;
        return res.json(response);
      }

      let result = await adminService.addTeacher(data);
      response.message = constants.SUCCESS;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response);
    } catch (error) {
      console.log(
        "error",
        "try-catch: userController.addStudent failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
};
module.exports = adminController;
