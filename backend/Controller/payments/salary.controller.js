const salaryService = require("../../Services/salary.service");
const validators = require("../../validators/fees/fees");
const constants = require("../../constants/en");
const stripe = require("stripe")(process.env.ROHAN_STRIPE_KEY);
const moment = require("moment");
const { sendGrid } = require("../../middleware/sendMail");

const salaryController = {
  index: async (req, res) => {
    let amount = req.body.amount;
    let userInfo = res.userData;
    const teacherId = req.body.teacherId;
    const date = moment().format("YYYY-MM-DD");
    let response = {};

    try {
      if (userInfo.role !== "admin") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let validateData = {
        amount,
        teacherId,
      };

      let validatorResult = await validators.teacher(validateData);
      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let findTeacher = await salaryService.findTeacher(teacherId);
      if (!findTeacher) {
        response.status = constants.NOT_FOUND_STATUS_CODE;
        response.error = constants.NO_USERS_FOUND;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      let findSalary = await salaryService.findSalary(teacherId, date);
      if (findSalary) {
        response.message = constants.PAID;
        response.status = constants.SUCCESS_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      let data = {
        teacherId,
        salary: amount,
        date,
      };

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
          description: "Teacher Salary Payment",
        },
        (err, charge) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: err.message });
          }
        }
      );

      let result = await salaryService.updatePayment(data);
      let sgData = {
        email: findTeacher.email,
        subject: "Payment Initiated to your account",
        text: `Salary of ₹${amount} is credited to Your Bank`,
        html: `<h1><strong>Salary of ₹${amount} is credited to Your Bank</strong></h1>`,
      };

      sendGrid(sgData);

      response.message = constants.PAYMENT_SUCCESS;
      response.status = constants.SUCCESS_STATUS_CODE;
      return res.json({ response, result }).status(response.status);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = salaryController;
