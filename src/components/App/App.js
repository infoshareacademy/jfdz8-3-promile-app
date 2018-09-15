import React, { Component } from 'react';
import './App.css';
import '../AvailableSlots/AvailableSlots.css'
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'
import ListItem from "../ListItem/ListItem";
import Login from "../Login/Login"
import { database } from '../FirebaseConfig/FirebaseConfig'

class App extends Component {

  state = {
    search: '',
    events: [],
    clickedEvent: '',
    user: null,
    userCreatedEvents: false,
    userAttendedEvents: false
  };

  getEvents = () => {
    database.ref('/events')
    .on('value', (snapshot) => {
        const value = snapshot.val();
        const list = (value && Object.entries(value)
          .map(item => {
            return {
              ...item[1],
              id: item[0],
            };
          })) || [];
        this.setState({
          events: list,
          userCreatedEvents: false,
          userAttendedEvents: false
        })
    })
  };

  getUserCreatedEvents = () => {
    const events = this.state.events;
    const usersEvents = events.filter(event => event.creator === this.state.user.uid);
    this.setState({
      events: usersEvents,
      userCreatedEvents: true
    })
  };

  getEventsUserAttend = () => {
    database.ref(`/users/${this.state.user.uid}/subscribed`)
      .on('value', snapshot => {
        const value = Object.keys(snapshot.val());
        const events = this.state.events;
        const userAttends = events.filter(event => value.indexOf(event.id) > -1);
        this.setState({
          events: userAttends,
          userAttendedEvents: true
        })
      })
  };

  componentDidMount() {
    this.getEvents()
  }

  handleCallback = (data) => {
    this.setState({
      clickedEvent: data,
    })};

  handleRevertView = () => {
    this.setState({
      clickedEvent: ''
    })};

  handleSearchCriteria = (event) => {
    this.setState({
    search: event.toLowerCase()
    })};

  handleUser = (user) => {
    this.setState({
      user: user,
    })
  };

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
        <Login getUser={this.handleUser}/>
        {
          this.state.user &&
            <div>
              <button onClick={() => this.state.userCreatedEvents ? this.getEvents() : this.getUserCreatedEvents() }>Show events I created</button>
              <button onClick={() => this.state.userAttendedEvents ? this.getEvents() : this.getEventsUserAttend() }>Show event I attend to</button>
            </div>
        }

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
                      user={this.state.user}
                  />
          </div>
          <NewEventDisplay events={this.state.events}
                           getEvents={this.getEvents}
                           callback={this.handleCallback}
                           clickedEvent={this.state.clickedEvent}
                           user={this.state.user}
          />
      </div>
    );
  }
}

export default App;
