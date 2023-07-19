
const Post = require('../models/post');

module.exports.home = async(req, res) => {
    const posts = await Post.find({}).populate('user');
    return res.render('home', {
        user_post:posts
    });
}