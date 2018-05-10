/**
 * Copyright (c) 2014 Ryan Gomba
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var express = require('express');
var browserify = require('connect-browserify');

var nodejsx = require('node-jsx');
nodejsx.install()

var app = express();

var development = process.env.NODE_ENV !== 'production';
if (development) {
    app.get('/assets/bundle.js',
        browserify('./components/App', {
            debug: true,
            watch: true
        })
    );
}

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser());

var session = require('express-session')
app.use(session({secret: 'skjdfklsd'}))

// twitter
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var Credentials = require('./constants/Credentials');
var twitterStrategy = new TwitterStrategy({
	consumerKey: Credentials.TWITTER_CONSUMER_KEY,
	consumerSecret: Credentials.TWITTER_CONSUMER_SECRET,
	callbackURL: "http://localhost:3333/auth/twitter/callback"
}, function(token, tokenSecret, profile, done) {
	var avatar_url = null;
	if (profile.photos.length > 0) {
		avatar_url = profile.photos[0].value;
	}
	return done(null, {
		'id': profile.id,
		'username': profile.username,
		'avatar_url': avatar_url,
		'token': token,
		'secret': tokenSecret
	});
});
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});
passport.use(twitterStrategy);
app.use(passport.initialize());
app.use(passport.session());

var url = require('url');
var ReactAsync  = require('react-async');
var App = require('./components/App');
function renderApp(request, response, next) {
    var path = url.parse(request.url).pathname;
    var app = App({
    	path: path,
    	user: request.user
    });
    ReactAsync.renderComponentToStringWithAsyncState(app, function(error, markup) {
        if (error) {
            return next(error);
        }
        response.send(markup);
    });
}

function authenticate(request, response, next) {
	var path = url.parse(request.url).pathname;
	if (!request.user && path != "/login") {
		response.redirect("/login");
	} else {
		return next();
	}
}

// routing
var path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use(authenticate);
app.use(renderApp);

var server = app.listen(3333, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
});
