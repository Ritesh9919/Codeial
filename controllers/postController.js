const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
 await Post.create({
    content:req.body.content,
    user:req.user._id
 });

 return res.redirect('back');
}


module.exports.destroy = async (req, res) => {
   const post = await Post.findById(req.params.id);
   if(post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({post:req.params.id});
      return res.redirect('back');

   } else {
      return res.redirect('back');
   }
}