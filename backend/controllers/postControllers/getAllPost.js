const Post = require('../../models/post');

exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate('comments').populate('author');
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };