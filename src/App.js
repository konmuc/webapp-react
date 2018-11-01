import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PostsComponent from './components/PostsComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostsComponent></PostsComponent>
      </div>
    );
  }
}

export default App;
