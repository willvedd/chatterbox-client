import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketIOClient from 'socket.io-client';

var socket = SocketIOClient('http://162.243.248.149:80/');

var Chatbox = React.createClass({
  
  getInitialState:function(){
    const self = this;
    return{
      outMessage: "",
      inMessages: [],
      clientAlias: "Client"+self.props.clientID,
    }
  },

  componentDidMount:function(){
    const self = this;
    socket.on('message', (message) =>{
      console.log("client",message);
      self.setState({
        inMessages: (function(){
          var tempMessages = self.state.inMessages;
          tempMessages.push(message);
          return tempMessages;
        })(),
      })
    });
  },

  editClientAlias: function(e){
    this.setState({
      clientAlias: e.target.value,
    })
  },

  editMessage: function(e){
    this.setState({
      outMessage: e.target.value,
    })
  },

  sendMessage: function(e) {
    const self = this;

    if(self.state.outMessage.replace(/\s/g,'').length !== 0){
      socket.emit('message', {
        senderID: self.props.clientID,
        senderAlias: self.state.clientAlias,
        message: self.state.outMessage,
        messageID: self.props.clientID + "-" + Date.now(),
      });
      self.setState({
        outMessage: "",
      })
    }
  },

  render: function(){
    const self = this;
    return (
      <div className="App">
        <h1>{self.props.chatName}</h1>
        <input type="textarea" value={self.state.clientAlias} onChange={(event)=>self.editClientAlias(event)}/>
        <div>
          {self.state.inMessages.map(function(inMessage){
            return(
              <span key={inMessage.messageID}><b>{inMessage.senderAlias}</b>{inMessage.message}<br/></span>
            )
          })}
        </div>

        <input value={this.state.outMessage} type="textarea" onChange={(event)=>self.editMessage(event)}/>
        <button onClick={(event)=>this.sendMessage(event)}>Send Message</button>
      </div>
    ); 
  }
});
export default Chatbox;
