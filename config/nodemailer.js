const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'riteshkumar411552@gmail.com',
        pass:'ritesh#161'
    }

});


let renderTemplate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if(err) {console.log('error in rendering template', err); return};
            mailHtml = template;
        }
    )
    return mailHtml;
};

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}