import React, { Component } from 'react';
import './App.css';
import MainMap from '../Map/Map'
import AddEventButton from '../AddEventButton/AddEventButton'
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
        <MainMap className="mainMap"/>
        <NewEventDisplay />
      </div>


    );
  }
}

export default App;
