const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comment_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');


module.exports.create = async (req, res) => {
   Post.findById(req.body.post, function(err, post) {
    if(post) {
        Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        }, function(err, comment) {
            post.comments.push(comment);
            post.save();
            comment = comment.populate('user', 'name email').execPopulate((err, comment) => {
            //    commentMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err) {
                if(err) {
                    console.log('error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);
            })
            });
            
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