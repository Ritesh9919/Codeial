const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');


// tell passport to use new strategy for google login
passport.use(new GoogleStrategy({
    clientID:"374287534599-l7tki1qbfb0r023a9t73s9bpvrla7pqb.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",

}, function(accessToken, refreshToken, profile, done) {
    // find the user
    User.findOne({email:profile.emails[0].value}, exec(function(err, user) {
        if(err) {console.log('error in google strategy passport', err); return};
        if(user) {
            // if found set this user as req.user
            return done(null, user);
        } else {
            // if not found create user and set as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }, function(err, user) {
                if(err) {console.log('error in creating google strategy passport', err); return};
                return done(null, user);
            })
        }

    }))
}));


module.exports = passport;