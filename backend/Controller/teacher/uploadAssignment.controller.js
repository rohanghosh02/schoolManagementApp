const assignmentService = require("../../Services/uploadAssignment.service");
const constants = require("../../constants/en");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    size: 10,
  },
}).single("image");
let data;

const assignmentController = {
  uploadAssignment: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        res
          .status(constants.VALIDATION_STATUS_CODE)
          .send(constants.SOMETHING_WENT_WRONG);
      }

      let token = res.userData;
      let image = req.file;
      let teacherId = token.id;
      let Class = req.body.Class;
      let note = req.body.note;
      let assignmentImage = image.filename;
      data = { assignmentImage, teacherId, Class, note };

      let uploadAssignment = await assignmentService.uploadAssignment(data);
      console.log(uploadAssignment);
      return res.send({ Message: constants.UPLOADED_SUCCESSFULLY });
    });
  },
};
module.exports = assignmentController;
