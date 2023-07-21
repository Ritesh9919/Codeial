const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');



passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
}, async (req, email, password, done) => {
    try{
    const user = await User.findOne({ email: email });

    if (!user || password != user.password) {
        req.flash('error', 'Invalid UserName/Password');
        return done(null, false);
    }

    return done(null, user);
} catch(err) {
    req.flash('error',err);
}
}
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    
  try{
    const user = await User.findById(id);
    return done(null, user);
  } catch(err) {
    console.log('Error', err);
  }

})


passport.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}


module.exports = passport;


