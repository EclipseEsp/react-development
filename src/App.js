import React from 'react';
import './App.css';
import SocketDemo from './components/SocketDemo';
import FetchDemo from './components/FetchDemo';
import BasicLayout from './components/BasicLayout';
import Dashboard from './components/Dashboard';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import ChatBox from './components/ChatBox';
import PopupWindow from 'react-chat-window/lib/components/popups/PopupWindow';
import ChatWindow from 'react-chat-window/lib/components/ChatWindow';
import ChatWindow2 from './components/ChatWindow2';
//import ChatWindow from './components/ChatWindow';

function App(props) { 
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
