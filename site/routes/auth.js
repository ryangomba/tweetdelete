var express = require('express');
var router = express.Router();

var passport = require('passport');

router.get('/twitter', passport.authenticate('twitter'));

router.get('/logout', function (request, response) {
	request.logout();
  	response.redirect('/login');
});

router.get('/twitter/callback', passport.authenticate('twitter', {
	successRedirect: '/',
	failureRedirect: '/login'
}));

module.exports = router;
