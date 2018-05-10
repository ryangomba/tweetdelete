/**
 * Copyright (c) 2014 Ryan Gomba
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @jsx React.DOM
 */

var React = require('react');

var API = require('../utils/API');

var Logo = require("./Logo")
var TweetList = require('./TweetList')
var TweetStore = require('../stores/TweetStore');
var LoadMoreTweetsButton = require('../components/LoadMoreTweetsButton');

var HomePage = React.createClass({
	componentDidMount: function() {
		var maxID = TweetStore.getMaxID();
		API.fetchTweetsForUser(this.props.user, maxID);
	},

	render: function() {
		var username = this.props.user.username;
		return (
			<div className="page" id="home">
				<header>
					<Logo />
					{ username}
					<a href="/auth/logout">Log Out</a>
				</header>
				<section>
					<TweetList />
					<LoadMoreTweetsButton />
				</section>
			</div>
    	);
  	}
});

module.exports = HomePage;
