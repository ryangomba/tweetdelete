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

var ClientActions = require('../actions/ClientActions');

var LoadMoreTweetsButton = React.createClass({
    render: function() {
        return (
            <div className="loadMoreButton" onClick={this._onClick}>
                Load More Tweets
            </div>
        );
    },

    _onClick: function() {
        ClientActions.loadMoreTweets();
    }

});

module.exports = LoadMoreTweetsButton;
