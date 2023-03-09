const connection = require("../models");
const { sequelize, Sequelize } = connection;
const { Op } = Sequelize;
const Models = sequelize.models;
const bcrypt = require("bcrypt");
const { count } = require("console");
const {
  StudentAttendance,
  TeacherAttendance,
  users,
  Post,
  Post_likes,
  Post_comment,
} = Models;

const ContentService = {
  createPost: async (insert_data) => {
    return await Post.create(insert_data);
  },

  find_Teacher_and_Admin: async (token) => {
    return await users.findOne({
      where: { id: token.id },
    });
  },
  CreateComment: async (insert_data) => {
    return await Post_comment.create(insert_data);
  },
  Count_comment: async (insert_data) => {
    return Post_comment.count({ where: { PostId: insert_data.PostId } });
  },
  FindPost: async (insert_data) => {
    return await Post.findOne({
      where: { id: insert_data.PostId },
    });
  },

  update_comment: async (insert_data, counts) => {
    return await Post.update(
      {
        total_comment: counts,
      },
      {
        where: {
          id: insert_data.PostId,
        },
      }
    );
  },

  FindUser: async (token) => {
    return await users.findOne({ where: { id: token.id } });
  },

  find_like: async (insert_data) => {
    return await Post_likes.findOne({
      where: { UserId: insert_data.UserId, PostId: insert_data.PostId },
    });
  },

  like_destroy: async (insert_data) => {
    return await Post_likes.destroy({
      where: { UserId: insert_data.UserId, PostId: insert_data.PostId },
    });
  },

  like_create: async (insert_data) => {
    return await Post_likes.create(insert_data);
  },
  likes_count: async (insert_data) => {
    return await Post_likes.count({ where: { PostId: insert_data.PostId } });
  },

  update_likes: async (insert_data, count) => {
    return await Post.update(
      {
        total_likes: count,
      },
      {
        where: {
          id: insert_data.PostId,
        },
      }
    );
  },
  Find_post: async (data) => {
    return await Post.findOne({
      where: { id: data.PostId },
    });
  },

  FindPostAndUser: async (insert_data, token) => {
    return await Post_comment.findOne({
      where: { UserId: token.id, id: insert_data.commentId },
    });
  },

  Delete_comment: async (insert_data) => {
    await Post_comment.destroy({ where: { id: insert_data.commentId } });
  },
};
module.exports = ContentService;
