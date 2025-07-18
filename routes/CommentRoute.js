const express = require('express');
const { createCommentValidator } = require('../utils/validators/CommentValidator');
const CommentService = require('../services/CommentService');
const router = express.Router();
const {
  createComment,
  getComment,
  getComments,
  updateComment,
  deleteComment,
  getcommentbyproduct
} = require('../services/CommentService');
const { protect,allowedTo } = require('../services/AuthService');

router
  .route('/')
  .get(getComments)
  .post(protect, createComment);

router
  .route('/:id')
  .get(getComment)
  .put(createCommentValidator, protect ,updateComment)
  .delete(protect,allowedTo('admin','superadmin','manager'),deleteComment);

router.route('/product/:id').get(getcommentbyproduct);
module.exports = router;