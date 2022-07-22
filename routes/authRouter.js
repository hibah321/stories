const router = require('express').Router()
const passport = require('passport')


// Authentication using google

router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
    prompt: 'select_account'
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('redirecting');
    res.redirect('/profile');

})

// Log out
router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie('sid', {path: '/'});
    res.redirect('/');
})
router.get('/login', (req, res) => {
    console.log('redirecting');
    res.render('login', { title: 'login',  style: "/styles-login.css", user: req.user})
})

module.exports = router
