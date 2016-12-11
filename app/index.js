'use strict';

// NPM modules
const React = require('react');
const ReactDOM = require('react-dom');

var hello = React.createClass({
  render: function() {
    return(
      <div> Hello World </div>
    )
  },
});
//2 arguments - first element you want to render, and where you render it to
reactDOM.render(
  <hello/>,
  document.getElementById('app'),
)
