import React, { Component } from 'react';
import './App.css';
import '../AvailableSlots/AvailableSlots.css'
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'
import ListItem from "../ListItem/ListItem";
import { database } from '../FirebaseConfig/FirebaseConfig'

class App extends Component {

  state = {
    search: '',
    events: [],
    clickedEvent: ''
  };

  getEvents = () => {
    database.ref('/events')
    .once('value')
      .then(snapshot => {
        const value = snapshot.val();

        const list = (value && Object.entries(value)
          .map(item => {
            return {
              ...item[1],
              id: item[0],
            };
          })) || [];
        this.setState({
          events: list
        })
    })
  };

  send = () => {
      this.eventsList.forEach(event => database.ref('/events').push(event))
  };

  eventsList = [
    {
      "title": "Great event",
      "slots": "4",
      "freeSlots": 2,
      "coordinates": [
        54.405,
        18.61
      ],
      "description": "xyz",
      "technology": "JavaScript",
      "date": "2018-09-30",
      "time": "18:00:00",
      "tags": [
        "js",
        "webdev",
        "html"
      ]
    },
    {
      "title": "test",
      "technology": "PHP",
      "coordinates": [
        53.735715745326395,
        21.70173933699323
      ],
      "description": "Description",
      "slots": "7",
      "freeSlots": 3,
      "date": "2018-08-09",
      "time": "13:00",
      "tags": [],
    }
  ];

  componentDidMount() {
    this.getEvents()
  }

  handleCallback = (data) => {
    this.setState({
      clickedEvent: data
    })};

  handleRevertView = () => {
    this.setState({
      clickedEvent: ''
    })};

  handleSearchCriteria = (event) => {
    this.setState({
    search: event.toLowerCase()
    })};

  render() {
      const searchCriteria = this.state.events.filter(
          (event) => {
              return event.technology.toLowerCase().indexOf(this.state.search) !== -1
          });
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
                                  event.id === this.state.clickedEvent.id
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
