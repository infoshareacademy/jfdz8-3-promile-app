import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    textValue: 'ABC'
  };

  render() {
    return (
      <div className="App">
        <div className="map">
          <input type="text" value={this.state.textValue}/>
        </div>
      </div>
    );
  }
}

export default App;
