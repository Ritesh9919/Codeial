const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const env = require('./envirement');

const User = require('../models/user');

const option = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_secret
}


passport.use(new JWTStrategy(option, function(JwtPayload, done) {
    User.findById(JwtPayload._id, function(err, user) {
        if(err) {console.log('error in finding user form jwt'); return;}
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}));

module.exports = passport;