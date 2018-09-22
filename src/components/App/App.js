import React, { Component } from 'react';
import './App.css';
import '../AvailableSlots/AvailableSlots.css'
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'
import ListItem from "../ListItem/ListItem";
import Login from "../Login/Login"
import { database } from '../FirebaseConfig/FirebaseConfig'
import ButtonsUserEvents from "../ButtonsUserEvents/ButtonsUserEvents";

class App extends Component {

  state = {
    search: '',
    events: [],
    clickedEvent: '',
    user: null,
    userCreatedEvents: false,
    userAttendedEvents: false,
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
    usersEvents.length === 0 ? alert ('No events created!') :
    this.setState({
      events: usersEvents,
      userCreatedEvents: true
    })
  };

  getEventsUserAttend = () => {
    database.ref(`/users/${this.state.user.uid}/subscribed`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          const value = Object.keys(snapshot.val()) || this.state.events;
          const events = this.state.events;
          const userAttends = events.filter(event => value.indexOf(event.id) > -1);
          this.setState({
            events: userAttends,
            userAttendedEvents: true
          })
        }
        else {
          alert ('No events subscribed!')
        }
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
          <ButtonsUserEvents getUserCreatedEvents={this.getUserCreatedEvents}
                             getEventsUserAttend={this.getEventsUserAttend}
                             getAllEvents={this.getEvents}
                             userEvents={this.state.userCreatedEvents}
                             userAttend={this.state.userAttendedEvents}
          />
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
