import React, { Component } from 'react';
import './App.css';
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'
import ListItem from "../ListItem/ListItem";

class App extends Component {

  state = {
    search: '',
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
    })}

  handleRevertView = () => {
    this.setState({
      clickedEvent: ''
    })}

  handleSearchCriteria = (event) => {
    this.setState({
    search: event.toLowerCase()
    })}

  render() {
      const searchCriteria = this.state.events.filter(
          (event) => {
              return event.technology.toLowerCase().indexOf(this.state.search) !== -1
          })
    return (
      <div className="App">
        <div>
          <input
              type="text"
              placeholder = 'Search'
              value={this.state.search}
              onChange = {event=>this.handleSearchCriteria(event.currentTarget.value)}
          />
        </div>
          <div className="events-list">
              <h1>Events</h1>
                  <ListItem
                      eventsList={
                          searchCriteria.filter(event => this.state.clickedEvent === '' ? this.state.events : (
                                  event.id === this.state.clickedEvent
                              )
                          )}
                      revertView={this.handleRevertView}
                      eventClicked={this.state.clickedEvent}
                      handleCallback={this.handleCallback}
                  />
          </div>
          <NewEventDisplay events={this.state.events}
                           getEvents={this.getEvents}
                           callback={this.handleCallback}
                           clickedEvent={this.state.clickedEvent}
          />
      </div>
    );
  }
}

export default App;
