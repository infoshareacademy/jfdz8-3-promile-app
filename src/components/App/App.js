import React, { Component } from 'react';
import './App.css';
import MainMap from '../Map/Map'

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
        <MainMap className="mainMap"/>
      </div>
    );
  }
}

export default App;
