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
var ReactPropTypes = React.PropTypes;

var TweetStore = require('../stores/TweetStore');
var ClientActions = require('../actions/ClientActions');

var TweetListItem = React.createClass({

    propTypes: {
        tweet: ReactPropTypes.object
    },

    getStateFromStores: function() {
        return {
            selected: TweetStore.getTweetIDIsSelected(this.props.tweet.id)
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
        var tweet = this.props.tweet;
        var radioClassName = "radio";
        if (this.state.selected) {
            radioClassName += " selected";
        }
        return (
            <div className="tweet">
                <div className={radioClassName} onClick={this._onClick}></div>
                <p className="tweetText">
                    {tweet.text}
                </p>
            </div>
        );
    },

    _onClick: function() {
        ClientActions.selectTweetID(this.props.tweet.id);
    },

    _onChange: function() {
        this.setState(this.getStateFromStores());
    }

});

module.exports = TweetListItem;
