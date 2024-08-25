const Comment = require("../../models/Comment");
const ReplyComment = require("../../models/ReplyComment");

exports.replyComment = async (req, res) => {
    try {
      const { content } = req.body;
      console.log(content)
      const comment = await Comment.findById(req.params.commentId);
      console.log(comment)
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      const newReply =new ReplyComment( {
        userId: req.user._id,
        content,
      });
      await newReply.save()
      comment.replies.push(newReply);
      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };