const FeesServices = require("../../Services/fees.service");
const validators = require("../../validators/fees/fees");
const constants = require("../../constants/en");
const moment = require("moment");
const stripe = require("stripe")(process.env.ROHAN_STRIPE_KEY);

const FeesController = {
  FeesPayment: async (req, res) => {
    let amount = req.body.amount;
    let userInfo = res.userData;
    const enrollmentNo = userInfo.registrationId;
    let response = {};

    let year = moment().format("YYYY");

    try {
      if (userInfo.role !== "student") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let validateData = {
        amount,
      };
      let checkStudent = await FeesServices.findStudent(enrollmentNo);

      let validatorResult = await validators.student(
        validateData,
        checkStudent.totalFees
      );
      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      if (!checkStudent) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.NO_USERS_FOUND;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      let data = {
        name: userInfo.fullName,
        enrollmentNo,
        Class: checkStudent.Class,
        amount: amount,
        year,
      };

      if (checkStudent.dueFees === 0) {
        response.message = constants.NO_DUE;
        response.status = constants.SUCCESS_STATUS_CODE;
        return res.json(response).status(response.status);
      }
      const cardToken = await stripe.tokens.create({
        card: {
          number: "4242424242424242",
          exp_month: "03",
          exp_year: "2025",
          cvc: "123",
        },
      });

      stripe.charges.create(
        {
          amount: amount * 100,
          currency: "INR",
          source: cardToken.id,
          description: "Student fee payment",
        },
        (err, charge) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: err.message });
          }
        }
      );

      let result = await FeesServices.updatePayment(data);
      let dueFees = checkStudent.dueFees - data.amount;
      let paidFees = +data.amount + +checkStudent.paidFees;

      let updateData = {
        dueFees,
        paidFees,
        enrollmentNo,
      };

      await FeesServices.updateStudent(updateData);

      response.message = constants.PAYMENT_SUCCESS;
      response.status = constants.SUCCESS_STATUS_CODE;
      return res.json({ response, result, dueFees }).status(response.status);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = FeesController;
