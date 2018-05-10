var express = require('express');
var router = express.Router();

var Credentials = require('../constants/Credentials');
var superagent = require('superagent');
var OAuth = require('oauth');
require('superagent-oauth')(superagent);

var twitterAuth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    Credentials.TWITTER_CONSUMER_KEY,
    Credentials.TWITTER_CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
);

router.get('/tweets', function (request, response) {
	var user = request.session.passport.user;
	if (!user) {
		response.status(401).send({error: "login-required"});
		return;
	}

	var url = "https://api.twitter.com/1.1/statuses/user_timeline";
	url += "?user_id=" + user.id;
	url += "&count=100";
	url += "&trim_user=true";
	url += "&include_rts=false";

	var maxID = parseInt(request.params["max_id"]);
	if (maxID > 0) {
		url += "&max_id=" + request.params.max_id.toString();
	}

	superagent
	    .get(url)
	    .sign(twitterAuth, user.token, user.secret)
	    .accept('json')
	    .end(function(error, twitterResponse) {
	        if (twitterResponse.status == 200) {
	        	response.send(twitterResponse.body);
            } else {
            	if (!error) {
            		error = twitterResponse.body;
            	}
                response.status(twitterResponse.status).send(error);
	        }
	    });
});

router.delete('/tweets', function (request, response) {
	response.send("ok");
});

module.exports = router;
