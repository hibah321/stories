const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys.js')
const User = require('../models/user.js')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({googleID: profile.id})
            .then((currentUser) => {
                if(currentUser){
                    console.log('user found');
                    done(null, currentUser)
                }
                else{
                    const currentUser = new User({
                        googleID: profile.id,
                        username: profile.displayName,
                    })
                    currentUser.save()
                        .then(console.log('user added successfully'))
                        .catch((err) => console.log(err))
                    done(null, currentUser)
                }

            })
            .catch((err) => console.log(err))
        
    })
)