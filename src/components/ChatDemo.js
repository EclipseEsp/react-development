import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import io from 'socket.io-client'
import { array } from 'prop-types';

export default class ChatDemo extends Component {
  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }

  componentDidMount(){
    const socket = io('http://localhost:8000');
    socket.on('news', (data) => {
      console.log(data);
    });

    socket.emit('Chatbox Initialise', { message: 'request' });

    socket.on('Client2', (result) =>{
      // console.log(result);
      // console.log(Object.values(data)[0][0]);
      const messages = Object.values(result);
      console.log(messages);
      /* Receives initialization messages and future update to messages */
      /* Need to display it out in Chatbox using messageList[]          */
      const newMessages = messages.map(eachMessage => {
        /* messages.map will map will execute for each Item in Object Array,
           do something etc.. in this case I will map each object in the format
           of { author: eachMassage.user_id, text: 'text', data:{text: eachMessage.message_body}  };
           seen in:
           // const message = { author: meOrThem , type : 'text', data:{text: eachMessage.message_body}  };
           Note: this is object literal notation another method would be object constructor notation
           // const message {};
           // message['author'] = eachMessage.user_id;
           // message['type'] = 'text';
           // message['data'] = eachMessage.message_body;
        */
        if(eachMessage.user_id == "1003571") var meOrThem = 'them';
        else if (eachMessage.user_id == '1003572') var meOrThem ='me';

        const message = 
        { 
          author: meOrThem , 
          type : 'text',
          data :  {
            text: eachMessage.message_body
          }
        }
        return message;
      })
      console.log(newMessages);
      this.setState({
        messageList: newMessages
      })
    });
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    //send input to server here
    const socket = io('http://localhost:8000');
    socket.on('news', (data) => {
      socket.emit('Client1', { user_id: '1003572',  message: message.data.text }); // Send message to server.js
    });
  }
 
  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }
 
  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'Client 2',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>)
  }
}