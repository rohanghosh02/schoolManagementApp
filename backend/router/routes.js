const express = require("express");
const router = express.Router();
const adminCtrl = require("../Controller/admin/admin.controller");
const examinationCtrl = require("../Controller/admin/examination.controller");
const sendNotification = require("../Controller/sendNotifications/sendNotification.controller");
const tokenMiddleware = require("./../middleware/token.middleware");
const { upload } = require("../utilities/upload");
const libraryCtrl = require("../Controller/admin/library.controller");
const userController = require("../Controller/users/user.controller");
const studentCtrl = require("../Controller/student/student.controller");
const teacherCtrl = require("../Controller/teacher/teacher.controller");
const {
  userValidation,
  userLoginVal,
  updatePassword,
  forgetPassword,
  resetPassword,
  userUpdateValidation,
} = require("../validators/users/usersValidation");
const {
  attendanceValidation,
  teacherAttendanceValidation,
  showTeacherAttendanceValidation,
  showAttendanceValidation,
} = require("../validators/teacher/teacher");
const assignmentController = require("../Controller/teacher/uploadAssignment.controller");
const salaryCtrl = require("../Controller/payments/salary.controller");

// admin  route
router.post("/adminRegister/", userValidation, adminCtrl.signup); //
router.post("/adminLogin/", userLoginVal, adminCtrl.login);
router.post("/verifyUser/", tokenMiddleware, adminCtrl.verifyUser);
router.post("/addStudent", tokenMiddleware, adminCtrl.addStudent);
router.post("/addTeacher", tokenMiddleware, adminCtrl.addTeacher);
router.get("/userList/", tokenMiddleware, adminCtrl.userList);
router.delete("/deleteUser/", tokenMiddleware, adminCtrl.deleteUser);
router.post("/sendNotification/", tokenMiddleware, sendNotification);

//examination routes
router.post(
  "/addTimeTable",
  tokenMiddleware,
  upload.single("file"),
  examinationCtrl.addTimeTable
);
router.get("/viewTimeTables", examinationCtrl.viewTimeTable);
router.post("/addExamForm", tokenMiddleware, examinationCtrl.addExamForm);
router.get("/viewExamForms", examinationCtrl.viewExamForms);
router.post("/addMarks", tokenMiddleware, examinationCtrl.addStudentMarks);
router.get("/results", examinationCtrl.viewMarks);
router.get("/ranks", examinationCtrl.viewRank);

//library  routes
router.post("/addBook", tokenMiddleware, libraryCtrl.addBooks);
router.get("/books", tokenMiddleware, libraryCtrl.books);
router.put("/updateBook", tokenMiddleware, libraryCtrl.updateBooks);
router.put("/deleteBook", tokenMiddleware, libraryCtrl.deleteBook);
router.post("/addMember", tokenMiddleware, libraryCtrl.addMemberToLibrary);
router.post("/issueBook", tokenMiddleware, libraryCtrl.issueBook);
router.put("/updateIssuedBook", tokenMiddleware, libraryCtrl.updateIssuedBook);
router.get("/issuedBooks", tokenMiddleware, libraryCtrl.issuedBooks);

//salary routes
router.post("/paySalary", tokenMiddleware, salaryCtrl.index);

//student && teacher login &signup routes

router.post("/studentRegister", userValidation, studentCtrl.signup);
router.post("/studentLogin", userLoginVal, studentCtrl.login);
router.post("/teacherRegister", userValidation, teacherCtrl.signup);
router.post("/teacherLogin", userLoginVal, teacherCtrl.login);

//profile

router.get("/userProfile", tokenMiddleware, userController.userProfile);
router.patch(
  "/updateProfile",
  tokenMiddleware,
  userUpdateValidation,
  userController.updateProfile
);
router.patch(
  "/updatePassword",
  tokenMiddleware,
  updatePassword,
  userController.updatePassword
);
router.post("/forgetPassword", forgetPassword, userController.forgetPassword);
router.post(
  "/verifyPassword",
  tokenMiddleware,
  resetPassword,
  userController.verifyPassword
);

//teacher dashboard routes
router.post(
  "/uploadAssignment",
  tokenMiddleware,
  assignmentController.uploadAssignment
);
router.post(
  "/studentAttendance",
  tokenMiddleware,
  attendanceValidation,
  teacherCtrl.studentAttendance
);
router.post(
  "/teacherAttendance",
  tokenMiddleware,
  teacherAttendanceValidation,
  teacherCtrl.teacherAttendance
);
router.get(
  "/showAttendance",
  tokenMiddleware,
  showAttendanceValidation,
  teacherCtrl.showAttendance
);

//student routes

router.get("/result", tokenMiddleware, studentCtrl.checkResult);

module.exports = router;
