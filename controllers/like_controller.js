const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');



module.exports.toggleLike = async(req, res) => {
    try{
        // /likes/toggle/?id=abbb&type=Post
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post') {
         likeable = await Post.findById(req.query.id).populate('likes');
        } else {
         likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like already exist
        let isLikeExist = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        });

         // if already exist then delete it
        if(isLikeExist) {
        likeable.likes.pull(isLikeExist._id);
        likeable.save();
        isLikeExist.remove();
        deleted = true;
        } else {
        let newLike = await Like.create({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        });

        likeable.likes.push(newLike._id);
        likeable.save();
        }

        return res.json(200, {
            message:'Request successfull!',
            deleted:deleted
        })

    } catch(err) {
        console.log(err);
        return res.json(500, {
            message:'Internal server error!'
        })
    }
}