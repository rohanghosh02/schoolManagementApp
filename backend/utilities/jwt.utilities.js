
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuth = {
  JWTSigning: async (payload, TokenExpiryTime) => {
    try {
      const token = await jwt.sign(payload, process.env.JWT_AUTH_KEY, {
        expiresIn: TokenExpiryTime + "h",
      });
      return {
        expiresIn: TokenExpiryTime + "h",
        token,
        status: true,
      };
    } catch (err) {
      return {
        expiresIn: TokenExpiryTime,
        token: "",
        status: false,
      };
    }
  },

  JWTVerify: async (token) => {
    try {
      return jwt.verify(
        token,
        process.env.JWT_AUTH_KEY,
        async (err, decoded) => {
          if (err) {
            return {
              status: false,
              verify: {},
              err: err,
            };
          } else {
            return {
              status: true,
              verify: decoded,
            };
          }
        }
      );
    } catch (err) {
      return {
        status: false,
        verify: {},
        err: err,
      };
    }
  },
};

// export
module.exports = jwtAuth;
