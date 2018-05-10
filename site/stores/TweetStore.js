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
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = require('../constants/Actions').ActionTypes;

var CHANGE_EVENT = 'change';

var _tweets = {};
var _selectedTweetIDs = [];

function _addTweets(tweets) {
    tweets.forEach(function(tweet) {
        _tweets[tweet.id] = tweet;
    });
}

function _selectTweet(tweetID) {
    console.log(tweetID);
    var index = _selectedTweetIDs.indexOf(tweetID);
    if (index > -1) {
        console.log("removing");
        delete _selectedTweetIDs[index];
    } else {
        console.log("adding");
        _selectedTweetIDs.push(tweetID);
    }
}

var TweetStore = merge(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    getMaxID: function() {
        var maxID = 0;
        for (var id in _tweets) {
            maxID = Math.max(maxID, id);
        }
        return maxID;
    },

    getTweetByID: function(id) {
        return _tweets[id];
    },

    getSelectedTweets: function() {
        var tweets = [];
        for (var id in _tweets) {
            if (_selectedTweetIDs.indexOf(id) > -1) {
                tweets.push(_tweets[id]);
            }
        }
        return tweets;
    },

    getTweetIDIsSelected: function(tweetID) {
        return _selectedTweetIDs.indexOf(tweetID) > -1;
    },

    getAllTweets: function() {
        var tweets = [];
        for (var id in _tweets) {
            tweets.push(_tweets[id]);
        }
        tweets.sort(function(t1, t2) {
            if (t1.date > t2.date) {
                return -1;
            } else if (t1.date < t2.date) {
                return 1;
            }
            return 0;
        });
        return tweets;
    },

});

TweetStore.setMaxListeners(0);

TweetStore.dispatchToken = Dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.RECEIVE_TWEETS:
            _addTweets(action.tweets);
            TweetStore.emitChange();
            break;

        case ActionTypes.SELECT_TWEET:
            _selectTweet(action.tweetID);
            TweetStore.emitChange();
            break;

        default:
            // noop
    }

});

module.exports = TweetStore;
