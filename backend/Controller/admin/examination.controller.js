const examinationService = require("../../Services/examination.service");
const constants = require("../../constants/en");
const validators = require("../../validators/admin/admin");
const { uploadBytes, ref, storage } = require("../../utilities/upload");
const path = require("path");
const examinationController = {
  addTimeTable: async (req, res) => {
    const Class = req.body.Class ? req.body.Class : "";
    const file = req.file;
    const type = path.extname(req.file.originalname);
    let response = {};
    const userInfo = res.userData;

    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }

      const storageRef = ref(storage, `files/${req.file.originalname}`);

      uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
        console.log("file uplaoded");
      });

      const path = storageRef.toString();
      const data = {
        fileName: file.originalname,
        Class,
        type,
        path,
      };

      const result = await examinationService.addTimeTable(data);

      response.message = constants.TIME_TABLE_ADDED;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.addTimeTable failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  viewTimeTable: async (req, res) => {
    const Class = req.query.Class ? req.query.Class : "10th";
    let response = {};

    try {
      const result = await examinationService.viewTimeTable(Class);
      if (!result) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }

      response.message = constants.SUCCESS;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.viewTimeTable failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  addExamForm: async (req, res) => {
    const userInfo = res.userData;
    let response = {};

    const examType = req.body.examType ? req.body.examType : "";
    const Class = req.body.Class ? req.body.Class : "";
    const fees = examType === "practical" ? 0 : req.body.fees;
    const startDate = req.body.startDate ? req.body.startDate : "";
    const endDate = req.body.endDate ? req.body.endDate : "";

    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let data = {
        examType,
        Class,
        fees,
        startDate,
        endDate,
      };

      let validatorResult = await validators.addExamForm(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      const result = await examinationService.addExamForm(data);
      response.message = constants.SUCCESS;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.addExamForm failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  viewExamForms: async (req, res) => {
    let response = {};

    try {
      const results = await examinationService.viewExamForms();
      if (results.length < 1) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }
      const practical = [];
      const theory = [];

      results.forEach((result) => {
        if (result.examType === "practical") {
          practical.push(result);
        } else if (result.examType === "theory") {
          theory.push(result);
        }
      });

      const finalResult = {
        practical,
        theory,
      };

      response.message = constants.SUCCESS;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = finalResult;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.viewExamForms failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  addStudentMarks: async (req, res) => {
    let enrollmentNo = req.body.enrollmentNo
      ? parseInt(req.body.enrollmentNo)
      : null;
    const Class = req.body.Class ? req.body.Class : "";
    const branch = req.body.branch ? req.body.branch : "";
    const totalMarks = req.body.totalMarks ? req.body.totalMarks : null;
    const marksData = req.body.marksData;
    const userInfo = res.userData;

    let response = {};

    let myDataArr = [];

    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      for (let i of marksData) {
        let obj = {
          subject: i.subject,
          theoryMarks: i.theoryMarks,
          practicalMarks: i.practicalMarks,
          Class,
          branch,
          totalMarks,
          enrollmentNo,
        };
        myDataArr.push(obj);
      }

      const data = {
        enrollmentNo,
        Class,
        branch,
        totalMarks,
        marksData,
      };

      let validatorResult = await validators.addStudentMarks(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      const findStudent = await examinationService.getOne(enrollmentNo);
      if (!findStudent) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = `enrollmentNo ${enrollmentNo} is not found`;
        return res.json(response).status(response.status);
      }

      const result = await examinationService.addStudentMarks(myDataArr);

      response.message = constants.RESULT_ADDED;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.addStudentResult failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  viewMarks: async (req, res) => {
    const enrollmentNo = req.query.enrollmentNo
      ? req.query.enrollmentNo
      : null;

    let response = {};
    try {
      const findStudent = await examinationService.getOne(enrollmentNo);
      if (!findStudent) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = `enrollmentNo ${enrollmentNo} is not found`;
        return res.json(response).status(response.status);
      }
      const result = await examinationService.viewMarks(enrollmentNo);
      if (result.length < 1) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }
      let studentInfo = {};
      let resultData = [];
      let grandTotal = 0;
      let percentage, grade;
      const gradeCalculate = (mark) => {
        switch (true) {
          case mark > 90:
            return "A+";
          case mark > 80:
            return "A";
          case mark > 70:
            return "B+";
          case mark > 60:
            return "B";
          case mark > 50:
            return "C";
          case mark >= 33:
            return "D";
          default:
            return "F";
        }
      };

      result.forEach((i) => {
        studentInfo.enrollmentNo = i.enrollmentNo;
        studentInfo.Class = i.Class;
        studentInfo.branch = i.branch;

        let resultObj = {
          subject: i.subject,
          theoryMarks: i.theoryMarks,
          practicalMarks: i.practicalMarks,
        };

        grandTotal = grandTotal + i.theoryMarks + i.practicalMarks;
        percentage = grandTotal / 5;

        grade = gradeCalculate(percentage);

        resultData.push(resultObj);
      });

      response.message = constants.SUCCESS;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.studentInfo = studentInfo;
      response.results = resultData;
      response.grandTotal = grandTotal;
      response.percentage = `${percentage}%`;
      response.grade = grade;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.viewMarks failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  viewRank: async (req, res) => {
    let response = {};

    try {
      const results = await examinationService.allResult();
      if (results.length < 1) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }

      let resultsArr = [];

      results.forEach((i) => {
        let Obj = {
          enrollmentNo: i.dataValues.enrollmentNo,
          theoryMarks: i.dataValues.theoryMarks,
          practicalMarks: i.dataValues.practicalMarks,
        };

        resultsArr.push(Obj);
      });
      const result = resultsArr.reduce((acc, current) => {
        if (!acc[current.enrollmentNo]) {
          acc[current.enrollmentNo] = [];
        }
        acc[current.enrollmentNo].push(current);
        return acc;
      }, {});

      const arr = Object.values(result);

      let enrollmentNumbers = [];
      let marks = [];

      for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = 0; j < arr[i].length; j++) {
          sum += arr[i][j].theoryMarks + arr[i][j].practicalMarks;
          if (!enrollmentNumbers.includes(arr[i][j].enrollmentNumber)) {
            enrollmentNumbers.push(arr[i][j].enrollmentNo);
          }
        }
        marks.push({
          enrollmentNo: arr[i][0].enrollmentNo,
          mark: sum,
        });
      }

      const top3 = marks
        .sort((a, b) => b.mark - a.mark)
        .slice(0, 3)
        .map(({ enrollmentNo, mark }, index) => ({
          enrollmentNo,
          mark,
          position: index + 1,
        }));

      response.message = constants.SUCCESS;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = top3;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.viewRank failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
};

module.exports = examinationController;
