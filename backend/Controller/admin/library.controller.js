const validators = require("../../validators/admin/admin");
const constants = require("../../constants/en");
const libraryService = require("../../Services/library.service");
const adminService = require("../../Services/admin.service");
const moment = require("moment");
const libraryController = {
  addBooks: async (req, res) => {
    const title = req.body.title ? req.body.title : "";
    const author = req.body.author ? req.body.author : "";
    const ISBN = req.body.ISBN ? req.body.ISBN : "";
    const publisher = req.body.publisher ? req.body.publisher : "";
    const available = req.body.available;
    const publicationDate = req.body.publicationDate;
    const userInfo = res.userData;

    let response = {};
    try {
      if (userInfo.role !== "teacher") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }

      let data = {
        title,
        author,
        ISBN,
        publisher,
        available,
        publicationDate,
      };

      let validatorResult = await validators.addBooks(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      let checkBook = await libraryService.isBook(ISBN);

      if (checkBook) {
        response.error = constants.BOOK_EXIST;
        response.status = constants.ALREADY_EXIST_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      const result = await libraryService.addBook(data);
      response.message = constants.BOOK_ADDED;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.addBooks failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  updateBooks: async (req, res) => {
    let response = {};
    const ISBN = req.body.ISBN ? req.body.ISBN : "";
    const userInfo = res.userData;
    try {
      if (userInfo.role !== "teacher") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }

      let checkBook = await libraryService.isBook(ISBN);

      if (!checkBook) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMassage = constants.BOOK_NOT_EXIST;
        response.status = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      const title = req.body.title ? req.body.title : checkBook.title;
      const author = req.body.author ? req.body.author : checkBook.author;
      const publisher = req.body.publisher
        ? req.body.publisher
        : checkBook.publisher;
      const available = req.body.available
        ? req.body.available
        : checkBook.available;
      const publicationDate = req.body.publicationDate
        ? req.body.publicationDate
        : checkBook.publicationDate;

      let data = {
        title,
        author,
        publisher,
        available,
        publicationDate,
      };

      let validatorResult = await validators.updateBook(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      const result = await libraryService.updateBook(data, ISBN);

      response.message = constants.BOOK_UPDATED;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.updateBook failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  books: async (req, res) => {
    let response = {};
    let available = req.query.available ? req.query.available : true;
    let ISBN = req.query.ISBN ? req.query.ISBN : "";
    let year = req.query.year;
    const limit = req.query.limit ? parseInt(req.query.limit) : 40;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const search = req.query.search ? req.query.search : "";
    const orderBy = req.query.orderBy ? req.query.orderBy : "id";
    const orderType = req.query.orderType ? req.query.orderType : "DESC";
    try {
      let data = {
        available,
        ISBN,
        year,
        limit,
        offset,
        search,
        orderBy,
        orderType,
      };
      const result = await libraryService.books(data);
      if (result.length < 1) {
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
      console.log("error", "try-catch: adminController.books failed.", error);
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  deleteBook: async (req, res) => {
    let response = {};
    const ISBN = req.body.ISBN;
    const userInfo = res.userData;
    try {
      if (userInfo.role !== "teacher") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let data = {
        ISBN,
      };

      let validatorResult = await validators.deleteBook(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let checkBook = await libraryService.isBook(ISBN);

      if (!checkBook) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMassage = constants.BOOK_NOT_EXIST;
        response.status = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      const result = await libraryService.deleteBook(ISBN);

      response.message = constants.BOOK_DELETED;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: adminController.deleteBook failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  addMemberToLibrary: async (req, res) => {
    const memberId = req.body.memberId;
    const userInfo = res.userData;
    let today = moment().format("YYYY-MM-DD");
    let response = {};
    try {
      if (userInfo.role === "student") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }

      let data = {
        memberId,
      };

      let validatorResult = await validators.addMemberToLibrary(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let checkUser = await adminService.findUser(memberId);
      if (!checkUser) {
        response.error = constants.USER_ID_NOT_EXIST;
        response.status = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      let checkMember = await libraryService.checkMember(memberId);

      if (checkMember) {
        response.error = constants.DATA_EXIST;
        response.status = constants.ALREADY_EXIST_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      let memberType;
      if (checkUser.role === "teacher") {
        memberType = "liberian";
      }
      if (checkUser.role === "student") {
        memberType = "student";
      }

      let sendData = {
        fullName: checkUser.firstName + " " + checkUser.lastName,
        email: checkUser.email,
        address: checkUser.address,
        memberId,
        dateOfJoin: today,
        memberType,
      };
      const result = await libraryService.addMember(sendData);
      response.message = constants.MEMBER_ADDED;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: libraryController.addMemberToLibrary failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
  issueBook: async (req, res) => {
    const memberId = req.body.memberId;
    const ISBN = req.body.ISBN;
    const userInfo = res.userData;
    let today = moment().format("YYYY-MM-DD");
    let response = {};
    try {
      if (userInfo.role === "student") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }

      let data = {
        memberId,
        ISBN,
      };

      let validatorResult = await validators.issueBook(data);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }
      let checkLiberian = await libraryService.checkLiberian(
        userInfo.registrationId
      );
      if (!checkLiberian) {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }

      let checkMember = await libraryService.checkMember(memberId);

      if (!checkMember) {
        response.error = constants.NOT_MEMBER;
        response.status = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      let checkBook = await libraryService.findBook(ISBN);

      if (!checkBook) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMassage = constants.BOOK_NOT_EXIST;
        response.status = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response).status(response.status);
      }
      const startDate = moment();
      const dateReturn = startDate.add(10, "days").format("YYYY-MM-DD");

      let sendData = {
        fullName: checkMember.fullName,
        email: checkMember.email,
        address: checkMember.address,
        memberId: checkMember.memberId,
        ISBN,
        bookName: checkBook.title,
        dateIssued: today,
        issuedBy: userInfo.fullName,
        dateReturn,
      };

      let checkIsIssued = await libraryService.checkIsIssued(data);
      if (checkIsIssued) {
        response.message = constants.ALREADY_ISSUED;
        res.statusCode = constants.ALREADY_EXIST_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      const result = await libraryService.issueBook(sendData);
      response.message = constants.BOOK_ISSUED;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.results = result;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: libraryController.issueBook failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  updateIssuedBook: async (req, res) => {
    const memberId = req.body.memberId;
    const ISBN = req.body.ISBN;
    const status = req.body.status;
    const lateFine = req.body.lateFine ? req.body.lateFine : 0;
    const userInfo = res.userData;
    let response = {};
    try {
      if (userInfo.role === "student") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }

      let dataToValidate = {
        memberId,
        ISBN,
        status,
      };

      let validatorResult = await validators.updateIssuedBook(dataToValidate);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      let checkMember = await libraryService.checkMember(memberId);

      if (!checkMember) {
        response.error = constants.NOT_MEMBER;
        response.status = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      let checkBook = await libraryService.findBook(ISBN);

      if (!checkBook) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMassage = constants.BOOK_NOT_EXIST;
        response.status = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response).status(response.status);
      }

      let data = {
        memberId,
        ISBN,
      };

      let checkIsIssued = await libraryService.checkIsIssued(data);
      if (!checkIsIssued) {
        response.message = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response).status(response.status);
      }
      let sendData = {
        status,
        lateFine,
        memberId,
      };
      const result = await libraryService.updateIssuedBook(sendData);
      response.message = constants.BOOK_ISSUED_UPDATE;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response).status(response.status);
    } catch (error) {
      console.log(
        "error",
        "try-catch: libraryController.updateIssuedBook failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },

  issuedBooks: async (req, res) => {
    let response = {};
    const userInfo = res.userData;
    let ISBN = req.query.ISBN;
    let memberId = req.query.memberId ? req.query.memberId : "";
    let date = req.query.date;
    let status = req.query.status;
    let issuedBy = req.query.issuedBy;
    const limit = req.query.limit ? parseInt(req.query.limit) : 40;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const search = req.query.search ? req.query.search : "";
    const orderBy = req.query.orderBy ? req.query.orderBy : "id";
    const orderType = req.query.orderType ? req.query.orderType : "DESC";
    try {
      if (userInfo.role === "student") {
        response.status = constants.UNAUTHORIZED_CODE;
        response.errorMessage = constants.UNAUTHORIZED_USER;
        return res.json(response).status(response.status);
      }
      let data = {
        ISBN,
        date,
        limit,
        offset,
        search,
        orderBy,
        orderType,
        memberId,
        status,
        issuedBy,
      };

      let dataToValidate = {
        ISBN,
        date,
        status,
      };

      let validatorResult = await validators.issuedBooks(dataToValidate);

      if (!validatorResult.validate) {
        response.status = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response).status(response.status);
      }

      const result = await libraryService.issuedBooks(data);
      if (result.length < 1) {
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
        "try-catch: adminController.issuedBooks failed.",
        error
      );
      response.status = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      return res.json(response).status(response.status);
    }
  },
};

module.exports = libraryController;
