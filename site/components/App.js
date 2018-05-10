/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactMount  = require('react/lib/ReactMount');
var ReactRouter = require('react-router-component');

var Pages = ReactRouter.Pages;
var Page = ReactRouter.Page;
var NotFound = ReactRouter.NotFound;

var HomePage = require('./HomePage');
var LoginPage = require('./LoginPage');
var NotFoundHandler = require('./NotFoundPage');

ReactMount.allowFullPageRender = true;

var propStoreID = "props";

function safeStringify(obj) {
	var json = JSON.stringify(obj);
	json = json.replace(/<\/script/g, '<\\/script');
	json = json.replace(/<!--/g, '<\\!--');
	return json;
}

var App = React.createClass({
    render: function() {
    	var jsonProps = safeStringify(this.props);
    	var propStore = <script type="application/json" id={propStoreID} dangerouslySetInnerHTML={{__html: jsonProps}}></script>;
    	
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="/assets/style.css" />
                    <script src="//use.typekit.net/bpk0tih.js"></script>
                    <script>Typekit.load()</script>

                    <script src="/assets/bundle.js" />
                    {propStore}
                </head>
                <Pages className="App" path={this.props.path}>
                    <Page path="/login" handler={LoginPage} />
                    <Page path="/" handler={HomePage} user={this.props.user} />
                    <NotFound handler={NotFoundHandler} />
                </Pages>
            </html>
        );
    }
});

if (typeof window !== 'undefined') {
    window.onload = function() {
    	var props = JSON.parse(document.getElementById(propStoreID).innerHTML);
        React.renderComponent(App(props), document);
    }
}

module.exports = App;
