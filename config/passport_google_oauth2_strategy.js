const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');
const env = require('./envirement');



// tell passport to use new strategy for google login
passport.use(new GoogleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callbackURL,

}, function (accessToken, refreshToken, profile, done) {
    // find the user
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if (err) { console.log('error in google strategy passport', err); return };
        if (user) {
            // if found set this user as req.user
            return done(null, user);
        } else {
            // if not found create user and set as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function (err, user) {
                if (err) { console.log('error in creating google strategy passport', err); return };
                return done(null, user);
            })
        }

    })
}));


module.exports = passport;