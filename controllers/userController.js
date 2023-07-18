const User = require('../models/user');


module.exports.signup = (req, res) => {
    return res.render('user_sign_up');
}

module.exports.profile = async (req, res) => {
    
            return res.render('user_profile', {
                title:'User Profile',
            
            })

}


module.exports.signin = (req, res) => {
    return res.render('user_sign_in');
}


module.exports.create = async (req, res) => {
   if(req.body.password != req.body.confirm_password) {
    return res.redirect('back');
   }

   const user = await User.findOne({email: req.body.email});
   if(!user) {
     await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
     })
     return res.redirect('/users/sign-in');
   } else {
    return res.redirect('back');
   }





}

module.exports.createSession = async (req, res) => {
  
}


