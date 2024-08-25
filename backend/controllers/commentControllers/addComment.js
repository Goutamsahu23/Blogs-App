const Comment = require('../../models/Comment');
const Post = require('../../models/post');

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    // Create a new comment
    const newComment = new Comment({
      postId: req.params.postId,
      userId: req.user._id,
      content,
    });
    await newComment.save();

    // Find the post by ID
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add the comment ID to the post's comments array
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
