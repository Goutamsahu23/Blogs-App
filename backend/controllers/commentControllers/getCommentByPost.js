const Comment = require('../../models/Comment');

exports.getCommentsByPost = async (req, res) => {
    try {
      const comments = await Comment.find({ postId: req.params.postId });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };