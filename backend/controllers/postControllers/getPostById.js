const Post = require('../../models/post');

exports.getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('comments').populate('author').exec();
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };