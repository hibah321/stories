const router = require('express').Router()
const passport = require('passport')


// Authentication using google

router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
    prompt: 'select_account'
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/create');

})

// Log out
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('err');
        }
        else{
            res.clearCookie('sid', {path: '/'});
            res.redirect('/');
        }
    });
})
router.get('/login', (req, res) => {
    res.render('login', { title: 'login',  style: "/styles-login.css", user: req.user})
})

module.exports = router
