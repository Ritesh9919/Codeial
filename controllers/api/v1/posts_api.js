
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async (req, res) => {
 const posts = await Post.find({});
    return res.json(200, {
        message:'List of posts',
        posts:posts
    })
}


module.exports.destroy = async (req, res) => {
    try{
      const post = await Post.findById(req.params.id);
      if(post.user == req.user.id) {
       post.remove();
    await Comment.deleteMany({post:req.params.id});
    // post.remove();
    return res.json({
        message:'Post and associated comments deleted successfully'
    })
  } else {
    return res.json(401,{
      message:'You can not delete this post'
    })
  }
    }catch(err) {
      console.log('Error', err);
      return res.json({
        message:'Post is not deleted'
      })
    }


}