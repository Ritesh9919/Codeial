const nodemailer = require('../config/nodemailer');


module.exports.newComment = (comment) => {
    nodemailer.transporter.sendMail({
        from:'riteshkumar411552@gmail.com',
        to: comment.user.email,
        subject:'new comment publised',
        html:'Your comment now publiced!'
    }, (err, info) => {
        if(err) {console.log('error in sending mail', err); return};
        console.log('Message sent', info);
        return;
    })
}