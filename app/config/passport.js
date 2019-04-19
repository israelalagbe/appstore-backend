var passport = require('passport');
var User = require('../models/user')
var config = require('./auth')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var LocalStrategy = require('passport-local').Strategy
let jwt = require('jsonwebtoken');
/* var localOptions = {
    usernameField: 'username'
};
var localLogin = new LocalStrategy(localOptions, function (username, password, done) {
    User.findOne({
        username
    }, function (err, user) {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false, {
                error: "Login Failed.Please try again"
            })
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err)
            }
            if (!isMatch) {
                return done(null, false, {
                    error: "Login Failed. Try Again"
                })
            }
            return done(null, user);
        })
    })
}) */

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
}
let jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload._id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
})
exports.generateJWT=function(user){
    var payload = {id: user.id};
    var token = jwt.sign(payload, config.secret);
    return token;
}
passport.use(jwtLogin);
//passport.use(localLogin);