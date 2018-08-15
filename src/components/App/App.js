import React, { Component } from 'react';
import './App.css';
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'

class App extends Component {

  state = {
    textValue: ''
  };

  render() {
    return (
      <div className="App">
        <div>
          <input type="text" value={this.state.textValue}/>
        </div>
        <NewEventDisplay />
      </div>


    );
  }
}

export default App;
