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

var TweetStore = require('../stores/TweetStore');
var TweetListItem = require('../components/TweetListItem');

var TweetList = React.createClass({

    getStateFromStores: function() {
        return {
            tweets: TweetStore.getAllTweets()
        };
    },

    getInitialState: function() {
        return this.getStateFromStores();
    },

    componentDidMount: function() {
        TweetStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TweetStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var createTweetItem = function(tweet) {
            return <TweetListItem key={tweet.id} tweet={tweet} />;
        };

        return (
            <div className="tweets">
                { this.state.tweets.map(createTweetItem) }
            </div>
        );
    },

    _onChange: function() {
        this.setState(this.getStateFromStores());
    }

});

module.exports = TweetList;
