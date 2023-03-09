
const jwtAuth = require("../utilities/jwt.utilities");
const constants = require("./../constants/en");

const tokenMiddleware = async (req, res, next) => {
  let token = req.headers.authorization ? req.headers.authorization : "";
  let response = {};

  if (token === "") {
    res.statusCode = 403;
    response.error = constants.TOKEN_REQUIRED_ERROR;
    response.errorMessage = constants.TOKEN_VALIDATION;
    console.log(response);
    return res.json(response);
  } else {
    // get token
    if (token && token.split(" ")[0] === "Bearer") {
      token = token.split(" ")[1];
      const jwtData = await jwtAuth.JWTVerify(token);
      if (jwtData.status === false) {
        res.statusCode = 403;
        response.error = constants.TOKEN_INVALID_ERROR;
        response.errorMessage = constants.TOKEN_INVALID;
        return res.json(response);
      }
      res.userData = jwtData.verify;
      next();
    }
  }
};
module.exports = tokenMiddleware;
