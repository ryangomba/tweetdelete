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

var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Actions').ActionTypes;

var TweetStore = require("../stores/TweetStore");
var API = require("../utils/API");

module.exports = {

	selectTweetID: function(tweetID) {
    	Dispatcher.handleClientAction({
      		type: ActionTypes.SELECT_TWEET,
      		tweetID: tweetID
    	});
  	},

  	loadMoreTweets: function() {
		Dispatcher.handleClientAction({
      		type: ActionTypes.LOAD_MORE_TWEETS
    	});
    	// TODO
    	// var maxID = TweetStore.getMaxID();
    	// API.fetchTweetsForUser(user, maxID);
  	},

  	deleteSelectedTweets: function() {
		Dispatcher.handleClientAction({
      		type: ActionTypes.DELETE_TWEETS,
    	});
    	// TODO
  	},

};
