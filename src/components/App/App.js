import React, { Component } from 'react';
import './App.css';
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'

class App extends Component {

  state = {
    textValue: '',
    events: []
  };

  getEvents = () => {
    fetch(`http://localhost:3000/events`)
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
        <div className="events-list">
          <h1>Events</h1>
          {this.state.events.map(event =>
            <li className="single-event" key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.technology}</p>
            </li>
          )}
        </div>
        <NewEventDisplay events={this.state.events} getEvents={this.getEvents}/>
      </div>
    );
  }
}

export default App;
