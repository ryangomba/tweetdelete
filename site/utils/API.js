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

var ServerActions = require('../actions/ServerActions');

var superagent = require('superagent');

var twitter = require('twitter');

module.exports = {

    fetchTweetsForUser: function(user, maxID) {
        var url = "/api/tweets?max_id=" + maxID;
        superagent
            .get(url)
            .accept('json')
            .end(function(error, response) {
                if (error) {
                    console.log(error);
                } else {
                    var tweets = response.body;
                    ServerActions.receiveTweets(tweets);
                }
            });
    },

};
