import React from 'react';
import './App.css';

function App(props) {
  return (
    <div className="App">
      Hello {HelloWorld()}
    </div>
  );
}

function HelloWorld() {
  return "World";
}

export default App;
