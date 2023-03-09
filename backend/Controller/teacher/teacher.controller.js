const userCtrl = require("../../Controller/users/user.controller");
const teacherService = require("../../Services/teacher.service");
const constants = require("../../constants/en");
const { format } = require("date-fns");
const moment = require("moment");
const date = moment().format("YYYY-MM-DD");

const teacherController = {
  signup: async (req, res) => {
    const role = "teacher";
    let response = {};

    try {
      await userCtrl.addUser(req, res, role);
    } catch (error) {
      console.log("error", "try-catch: teacherService.signup failed.", error);
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
      console.log("error", "try-catch: teacherService.login failed.", error);
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  teacherAttendance: async (req, res) => {
    let token = res.userData;
    let status = req.body.status;
    let response = {};
    try {
      if (token.role !== "teacher") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }

      let data = {
        teacherId: token.registrationId,
        status,
        date,
      };

      let findAttendance = await teacherService.findTeacherAttendance(data);
      if (findAttendance) {
        return res.send({ Message: constants.ATTENDANCE_ALREADY_DONE });
      } else {
        let makeAttendance = await teacherService.makeTeacherAttendance(data);

        return res
          .status(200)
          .send({ Result: constants.ATTENDANCE_DONE, makeAttendance });
      }
    } catch (error) {
      console.log("error", error);
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },
  studentAttendance: async (req, res) => {
    try {
      let token = res.userData;
      let reqData = req.body;
      let { enrollmentNo, status } = reqData;

      let findStudent = await teacherService.studentFind(enrollmentNo);
      if (!findStudent) {
        return res.send({ Message: constants.NO_USERS_FOUND });
      }
      let data = {
        enrollmentNo,
        teacherId: token.registrationId,
        status: status,
        date,
      };

      let findTeacher = await teacherService.findTeacher(data.teacherId);

      if (findTeacher.Class !== findStudent.Class) {
        return res.send({
          error: constants.PERMISSION_ERROR,
          description: constants.PERMISSION_ERROR_DESCRIPTION,
        });
      }

      let findAttendance = await teacherService.findStudentAttendance(data);

      if (findAttendance) {
        return res.send({ Message: constants.ATTENDANCE_ALREADY_DONE });
      } else {
        let makeAttendance = await teacherService.makeAttendance(data);
        return res
          .status(200)
          .send({ Result: constants.ATTENDANCE_DONE, makeAttendance });
      }
    } catch (error) {
      console.log("error", error);
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(error).status(res.status);
    }
  },
  showAttendance: async (req, res) => {
    try {
      let token = res.userData;
      let role = token.role;

      let month = req.query.month;
      let year = req.query.year;

      let data = { token, month, year };

      if (role == "teacher") {
        let showAttendance = await teacherService.showTeacherAttendance(data);
        return res.send({ showAttendance });
      }
      if (role == "student") {
        let showAttendance = await teacherService.showStudentAttendance(data);
        return res.send({ showAttendance });
      }
    } catch (error) {
      console.log("error", error);
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },
};
module.exports = teacherController;
