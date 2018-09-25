import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import '../AvailableSlots/AvailableSlots.css'
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'
import ListItem from "../ListItem/ListItem";
import Login from "../Login/Login"
import { database } from '../FirebaseConfig/FirebaseConfig'
import ButtonsUserEvents from "../ButtonsUserEvents/ButtonsUserEvents";
import { ToastContainer, toast } from 'react-toastify'
import Logo from "../../images/logo/LOGO1.png";

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
          userAttendedEvents: false,
          userHasFavoriteEvents: false
        })
    })
  };

  getUserCreatedEvents = () => {
    const events = this.state.events;
    const usersEvents = events.filter(event => event.creator === this.state.user.uid);
    usersEvents.length === 0 ? toast.error("No events created") :
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
          toast.error('No events subscribed to!')
        }
      })
  };

    getUsersFavoriteEvents = () => {
        database.ref(`/users/${this.state.user.uid}/favorite/`)
            .on('value', snapshot => {
                if (snapshot.exists()) {
                    const value = Object.keys(snapshot.val()) || this.state.events
                    const events = this.state.events
                    const userFavorites = events.filter(event => value.indexOf(event.id) > -1)
                    this.setState({
                        events: userFavorites,
                        userHasFavoriteEvents: true
                    })
                }
                else {
                    toast.error(`There's no items you are observing`)
                }
            })
    }


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
        <div className="top_bar">
          <img alt="logo" className="top_bar_logo" src={Logo}/>
          <span className="logo_text">We got <span className="logo_text_it">it</span></span>
          <input
              className = "event_search-input"
              type = "text"
              placeholder = 'Wyszukaj...'
              value={this.state.search}
              onChange = {event=>this.handleSearchCriteria(event.currentTarget.value)}
          />
            {
                this.state.user &&
                <ButtonsUserEvents getUserCreatedEvents={this.getUserCreatedEvents}
                                   getEventsUserAttend={this.getEventsUserAttend}
                                   getUsersFavoriteEvents={this.getUsersFavoriteEvents}
                                   getAllEvents={this.getEvents}
                                   userEvents={this.state.userCreatedEvents}
                                   userAttend={this.state.userAttendedEvents}
                                   userHasFavorites={this.state.userHasFavoriteEvents}
                />
            }
          <Login getUser={this.handleUser}/>
        </div>
          <div className="list_container">
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
          <NewEventDisplay
               events={this.state.events}
               getEvents={this.getEvents}
               callback={this.handleCallback}
               clickedEvent={this.state.clickedEvent}
               user={this.state.user}
          />
          <div className="bottom-bar">
              <div className="add_event-container">
                  {
                      this.props.user &&
                      <button className="add_event_button" onClick={this.showNewEventPanel}>Dodaj wydarzenie</button>
                  }
              </div>
          </div>
          <ToastContainer/>
      </div>
    );
  }
}

export default App;
