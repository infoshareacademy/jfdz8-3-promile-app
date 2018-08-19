import React, { Component } from 'react';
import './App.css';
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'
import Test from '../test'

class App extends Component {

  state = {
    textValue: '',
    events: []
  };

  getEvents = () => {
    fetch(`http://localhost/events`)
      .then(results => {
        return results.json()
      })
      .then(eventsList => {
        this.setState({
          events: eventsList
        })
      })
  };

  componentDidMount() {
    this.getEvents()
  }

  render() {
    return (
      <div className="App">
        <div>
          <input type="text" value={this.state.textValue}/>
        </div>
        <NewEventDisplay />
        <Test />
      </div>


    );
  }
}

export default App;
