import React, { Component } from 'react';
import './App.css';
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'
import ListItem from "../ListItem/ListItem";

class App extends Component {

  state = {
    textValue: '',
    events: [],
    clickedEvent: ''
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

  handleCallback = (data) => {
    this.setState({
      clickedEvent: data
    })
  };

  render() {
    return (
      <div className="App">
        <div>
          <input type="text" value={this.state.textValue}/>
        </div>
        <div className="events-list">
          <h1>Events</h1>
          <ListItem eventsList={
            this.state.events.filter(event => this.state.clickedEvent === '' ? this.state.events : (
              event.id === this.state.clickedEvent
            ))}
          />
        </div>
          <NewEventDisplay events={this.state.events}
                           getEvents={this.getEvents}
                           callback={this.handleCallback}
          />
      </div>
    );
  }
}

export default App;
