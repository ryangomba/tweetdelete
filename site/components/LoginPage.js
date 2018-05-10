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

var Logo = require("./Logo")

var LoginPage = React.createClass({
	render: function() {
		return (
			<div className="page" id="login">
				<header>
					<Logo />
					<h2 className="description">Review your tweets and delete them in bulk.</h2>
				</header>
				<section>
					<a className="login" href="/auth/twitter"></a>
				</section>
			</div>
    	);
  	}
});

module.exports = LoginPage;
