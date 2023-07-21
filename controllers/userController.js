const User = require('../models/user');


module.exports.signup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up');
}

module.exports.profile = async (req, res) => {
    try{
    const user = await User.findById(req.params.id);
    return res.render('user_profile', {
        title: 'User Profile',
        profile_user:user

    })
} catch(err) {
    console.log('Error', err);
}

}


module.exports.update = async (req, res) => {
    try{
    if(req.user.id == req.params.id) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect('back');
    } else {
        return res.status(401).send('Unautherised');
    }
} catch(err) {
    console.log('Error', err);
}
}


module.exports.signin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in');
}


module.exports.create = async (req, res) => {
    try{
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.redirect('/users/sign-in');
    } else {
        return res.redirect('back');
    }
} catch(err) {
    console.log('Error', err);
}





}

module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroySession = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have Logged Out!');
        return res.redirect('/');
    });

}


