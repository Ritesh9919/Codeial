const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
// passport.use(new LocalStrategy(
//     async (email, password, done) => {
//         // finding user and stablish identity
//         try{
//         const user = await User.findOne({ email: email });
//         if (err) {
//             return done(err);
//         }

//         if (!user || user.password != password) {
//             return done(null, false);
//         }

//         return done(null, user);
//     }catch(err) {
//         return done(err);
//     }
//     }));


// passport.serializeUser((user, done) => {
//     return done(null, user.id);
// })


// passport.deserializeUser(async (id, done) => {
//     try{
//     const user = await User.findById(id);
//     return done(null, user);
//     }catch(err) {
//         return done(err);
//     }
// })


passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email: email });

    if (!user || password != user.password) {
        return done(null, false);
    }

    return done(null, user);
}
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    

    const user = await User.findById(id);
    return done(null, user);

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


