const Comment = require('../../models/Comment');

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const newComment = new Comment({
      postId: req.params.postId,
      userId: req.user._id,
      content,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};