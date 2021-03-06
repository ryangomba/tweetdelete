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

var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

var ActionSources = require('../constants/Actions').ActionSources;

var Dispatcher = copyProperties(new Dispatcher(), {

    handleServerAction: function(action) {
        var payload = {
            source: ActionSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    handleClientAction: function(action) {
        var payload = {
            source: ActionSources.CLIENT_ACTION,
            action: action
        };
        this.dispatch(payload);
    }

});

module.exports = Dispatcher;
