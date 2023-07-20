
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async(req, res) => {
    const posts = await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

const user = await User.find({});
    return res.render('home', {
        user_post:posts,
        all_users:user
    });
}