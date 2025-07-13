const Comment = require('../models/Comment');
const Factory = require("./HandleFactory");

exports.createComment = Factory.createOne(Comment);

exports.getComments = Factory.getAll(Comment, 'Comment');

exports.getComment = Factory.getOne(Comment);

exports.updateComment = Factory.updateOne(Comment);

exports.deleteComment = Factory.deleteOne(Comment);


exports.getcommentbyproduct = async (req, res, next) => {
    try {
        const comments = await Comment.find({ product: req.params.id })
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
    
        if (!comments || comments.length === 0) {
        return res.status(200).json({
            status: 'no comments',
            message: 'No comments found for this product',
        });
        }
    
        res.status(200).json({
        status: 'success',
        results: comments.length,
        data: { comments },
        });
    } catch (error) {
        next(error);
    }
    }