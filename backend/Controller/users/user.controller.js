const userService = require("../../Services/user.service");
const constants = require("../../constants/en");
const jwtUtility = require("../../utilities/jwt.utilities");
const bcrypt = require("bcrypt");
const UUID = require("uuid-int");
let randomNumber = Math.floor(Math.random() * 500 + 1);
const generator = UUID(randomNumber);

const { sendGrid } = require("../../middleware/sendMail");
const userServices = require("../../Services/user.service");
const validators = require("../../validators/admin/admin");
const moment = require("moment");

const userController = {
  addUser: async (req, res, role, status) => {
    const registrationId = generator.uuid();
    const reqData = req.body;
    let { firstName, lastName, dob, email, Password, number, gender, address } =
      reqData;

    dob = moment(dob).format("YYYY-MM-DD");
    console.log(dob);

    let data = {
      firstName,
      lastName,
      dob,
      email,
      Password,
      number,
      gender,
      address,
      registrationId,
    };

    try {
      let emailExistResult = await userService.emailExist(data);
      if (emailExistResult) {
        return res.send({ message: constants.DUPLICATE_EMAIL_EXIST });
      }

      let numberExist = await userService.numberExist(data);
      if (numberExist) {
        return res.send({ message: constants.DUPLICATE_NUMBER });
      }

      let password = await bcrypt.hash(Password, 10);

      let insertData = {
        firstName,
        lastName,
        dob,
        email,
        password,
        number,

        role,
        gender,
        address,
        registrationId,
        status,
      };
      let signupResult = await userService.signup(insertData);
      if (!signupResult) {
        return res.send("Something went wrong!");
      }

      let newdata = Object.assign({}, signupResult.dataValues);
      delete newdata.password;

      return res.json({
        message: "user signup successfully",
        result: newdata,
      });
    } catch (error) {
      console.log("error", "try-catch: adminController.index failed.", error);
      res.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      res.error = constants.SOMETHING_WENT_WRONG_TYPE;
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },
  loginUser: async (req, res) => {
    let reqData = req.body;
    let { email, password } = reqData;
    let data = { email, password };

    try {
      let findUser = await userService.emailExist(data);
      if (!findUser) {
        return res.send({ message: constants.EMAIL_NOT_FOUND });
      }

      let userPassword = findUser.password;
      let matchPassword = await userService.matchPassword(data, userPassword);
      if (!matchPassword) {
        return res.send({ message: constants.WRONG_PASSWORD });
      }
      let verify = await userService.verfyUser(data);
      if (!verify) {
        return res.send({ message: constants.INACTIVE_USER });
      }

      const Token = {
        id: findUser.id,
        fullName: findUser.firstName + " " + findUser.lastName,
        role: findUser.role,
        email: findUser.email,
        registrationId: findUser.registrationId,
        status: findUser.status,
      };
      let tokenGenerate = await jwtUtility.JWTSigning(
        Token,
        process.env.VERIFICATION_TOKEN_EXPIRY_IN
      );

      if (matchPassword && findUser) {
        let newdata = Object.assign({}, findUser.dataValues);
        delete newdata.password;

        if (findUser.role == "admin") {
          return res.json({
            message: "Welcome to Admin Panel..." + findUser.firstName,
            token: tokenGenerate,
          });
        } else if (findUser.role == "teacher") {
          return res.json({
            message: "Welcome to teacher Panel..." + findUser.firstName,
            token: tokenGenerate,
          });
        } else {
          return res.json({
            message: "Welcome to student Panel..." + findUser.firstName,
            token: tokenGenerate,
          });
        }
      }
    } catch (error) {
      console.log("error", "try-catch: adminController.index failed.", error);
      res.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      res.error = constants.SOMETHING_WENT_WRONG_TYPE;
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },
  userProfile: async (req, res) => {
    try {
      const token = res.userData;
      const authId = token.id;
      const authEmail = token.email;
      const userData = { authId, authEmail };
      const userProfile = await userService.userProfile(userData);

      return res.send({ Profile: userProfile });
    } catch (error) {
      console.log("error", "try-catch: adminController.index failed.", error);
      res.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      res.error = constants.SOMETHING_WENT_WRONG_TYPE;
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const token = res.userData;
      const authId = token.id;

      let findUser = await userService.findUser(authId);
  
      let reqData = req.body;
      let dob = reqData.dob ? reqData.dob : findUser.dob;
      let email = reqData.email ? reqData.email : findUser.email;
      let number = reqData.number ? reqData.number : findUser.number;
      let subject = reqData.subject ? reqData.subject : findUser.subject;
      let address = reqData.address ? reqData.address : findUser.address;

      let data = { email, number, authId };

        let emailExistResult = await userService.duplicatedEmailExist(data);
        if (emailExistResult) {
          return res.send({ message: constants.DUPLICATE_EMAIL_EXIST });
        }
        
        let numberExist = await userService.duplicatedNumberExist(data);
        if (numberExist) {
          return res.send({ message: constants.DUPLICATE_NUMBER });
        }

      let dataEntity = { dob, email, number, subject, address };
      let updateRequest = await userService.updateRequest(dataEntity, authId);
      let updatedUser = await userService.findUser(authId);
        return res.send({ Message: constants.UPDATE_PROFILE, updatedUser });

    } catch (error) {
      console.log("error", error);
      res.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      res.error = constants.SOMETHING_WENT_WRONG_TYPE;
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },
  updatePassword: async (req, res) => {
    try {
      let token = res.userData;
      let authId = token.id;

      let reqData = req.body;
      let { oldPassword, newPassword, confirmPassword } = reqData;

      let findUser = await userService.findUser(authId);

      let userPassword = findUser.password;
      let matchOldPassword = await userService.oldPassword(
        oldPassword,
        userPassword
      );
      if (!matchOldPassword) {
        return res.send({ Message: constants.OLD_PASS_NOT_MATCH });
      }

      if (newPassword != confirmPassword) {
        return res.send({ Message: constants.CONFIRM_PASSWORD_NOT_MATCH });
      }
      let hash = await bcrypt.hash(confirmPassword, 10);
      const updatePassword = await userService.updatePassword(hash, authId);

      return res.send({ Message: constants.PASSPORT_UPDATED });
    } catch (error) {
      console.log("error", error);
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },
  forgetPassword: async (req, res) => {
    try {
      let email = req.body.email;
      let data = { email };

      let findUser = await userService.emailExist(data);
      if (!findUser) {
        return res.send({ message: constants.EMAIL_NOT_FOUND });
      }

      if (findUser) {
        let otp = Math.floor(1000 + Math.random() * 9000);
        let sgData = {
          email: findUser.email,
          subject: "Verification Code",
          text: `Your  Verification code for password reset  is ${otp}`,
          html: `<h1><strong>Your  Verification code for password reset  is ${otp}</strong></h1>`,
        };

        sendGrid(sgData);
        const Token = {
          id: findUser.id,
          role: findUser.role,
          registrationId: findUser.registrationId,
          otp: otp,
          email: findUser.email,
        };
        let tokenGenerate = await jwtUtility.JWTSigning(
          Token,
          process.env.VERIFICATION_TOKEN_EXPIRY_IN
        );
        return res.json({
          result: constants.OTP_SEND,
          token: tokenGenerate,
        });
      }
    } catch (error) {
      console.log("error", error);
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },
  verifyPassword: async (req, res) => {
    try {
      let token = res.userData;
      let otp = req.body.otp;
      let password = req.body.password;
      let data = { otp, password };

      if (otp != token.otp) {
        return res.send({ message: constants.WRONG_OTP_MSG });
      }

      let user = await userService.userDetails(token);
      let userPassword = user.password;
      let matchPassword = await userService.matchPassword(data, userPassword);

      if (matchPassword) {
        return res.send({ Message: constants.EXIST_PASSWORD_ENTER });
      }
      let hash = await bcrypt.hash(password, 10);

      const ResetPassword = await userService.updatePassword(hash, token.id);
      return res.send({ Message: constants.PASSPORT_UPDATED });
    } catch (error) {
      console.log("error", error);
      res.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(res).status(res.status);
    }
  },

  uploadUserImg: async (req, res) => {
    console.log(req.file);
    // res.send({ message: "file uploaded successfully" });
  },
};

module.exports = userController;
