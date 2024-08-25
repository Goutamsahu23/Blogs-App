const User=require('../../models/User');
require('dotenv').config();

exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('posts');
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };