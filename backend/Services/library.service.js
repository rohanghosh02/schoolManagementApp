const connection = require("../models");
const { sequelize, Sequelize } = connection;
const { Op } = Sequelize;
const Models = sequelize.models;
const bcrypt = require("bcrypt");

const { users, books, libraryMembers, library } = Models;

const libraryService = {
  isBook: async (ISBN) => {
    const result = await books.findOne({
      where: { ISBN, deletedAt: null },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  addBook: async (data) => {
    const result = await books.create(data);
    if (result) {
      return result.dataValues;
    } else {
      return false;
    }
  },
  books: async (data) => {
    let params = {
      where: {
        deletedAt: null,
      },
    };

    if (data.available) {
      params.where = {
        available: data.available,
      };
    }

    if (data.ISBN) {
      params.where = {
        ISBN: data.ISBN,
      };
    }

    if (data.year) {
      params.where = sequelize.where(
        sequelize.fn("YEAR", sequelize.col("publicationDate")),
        data.year
      );
    }

    if (data.search != "") {
      params.where = {
        [Op.or]: [
          { author: { [Op.like]: "%" + data.search + "%" } },
          { title: { [Op.like]: "%" + data.search + "%" } },
        ],
      };
    }
    const result = await books.findAndCountAll({
      where: params.where,
      order: [[data.orderBy, data.orderType]],
      offset: data.offset,
      limit: data.limit,
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  updateBook: async (data, ISBN) => {
    const result = await books.update(data, {
      where: {
        ISBN,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  deleteBook: async (ISBN) => {
    let date = Date.now();

    const result = await books.update(
      { deletedAt: date },
      {
        where: {
          ISBN,
        },
      }
    );
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  checkMember: async (memberId) => {
    const result = await libraryMembers.findOne({
      where: {
        memberId,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  checkLiberian: async (memberId) => {
    const result = await libraryMembers.findOne({
      where: {
        memberId,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  addMember: async (data) => {
    const result = await libraryMembers.create(data);
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  findBook: async (ISBN) => {
    const result = await books.findOne({
      where: { ISBN, deletedAt: null, available: 1 },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  issueBook: async (data) => {
    const result = await library.create(data);
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  updateIssuedBook: async (data) => {
    const result = await library.update(data, {
      where: {
        memberId: data.memberId,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },

  checkIsIssued: async ({ memberId, ISBN }) => {
    const result = await library.findOne({
      where: {
        memberId,
        ISBN,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
  issuedBooks: async (data) => {
    let params = {
      where: {
        deletedAt: null,
      },
    };

    if (data.date) {
      params.where = {
        dateIssued: data.date,
      };
    }
    if (data.status) {
      params.where = {
        status: data.status,
      };
    }

    if (data.ISBN) {
      params.where = {
        ISBN: data.ISBN,
      };
    }

    if (data.memberId) {
      params.where = {
        memberId: data.memberId,
      };
    }
    if (data.issuedBy) {
      params.where = {
        issuedBy: data.issuedBy,
      };
    }

    if (data.search != "") {
      params.where = {
        [Op.or]: [
          { bookName: { [Op.like]: "%" + data.search + "%" } },
          { fullName: { [Op.like]: "%" + data.search + "%" } },
        ],
      };
    }
    const result = await library.findAndCountAll({
      where: params.where,
      order: [[data.orderBy, data.orderType]],
      offset: data.offset,
      limit: data.limit,
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  },
};

// export module to use on other files
module.exports = libraryService;
