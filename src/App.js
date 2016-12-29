import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatbox from './chatbox.js';



var App = React.createClass({
  render: function(){
    return (
      <div className="App">
        <Chatbox clientID="1"/>
      </div>
    ); 
  }
});
export default App;
