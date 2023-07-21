const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = (req, res) => {
   Post.findById(req.body.post, function(err, post) {
    if(post) {
        Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        }, function(err, comment) {
            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment Publised!');
            return res.redirect('/');
        })
    }
   })
}



module.exports.destroy = async(req, res) => {
    try{
    const comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id) {
        const postId = comment.post;
        comment.remove();
        await Post.findByIdAndUpdate(postId, {$pull: {comments:req.params.id}});
        req.flash('success', 'Comment deleted!');
        return res.redirect('back');
    } else {
        req.flash('error','You can not delete this comment!');
        return res.redirect('back');
    }
} catch(err) {
    
    req.flash('error', err);
}
}