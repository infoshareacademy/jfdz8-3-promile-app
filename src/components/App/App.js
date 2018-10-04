import React, { Component } from 'react';
import L from 'leaflet';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import '../AvailableSlots/AvailableSlots.css'
import NewEventDisplay from '../NewEventDisplay/NewEventDisplay'
import ListItem from "../ListItem/ListItem";
import Login from "../Login/Login";
import { database } from '../FirebaseConfig/FirebaseConfig';
import ButtonsUserEvents from "../ButtonsUserEvents/ButtonsUserEvents";
import { ToastContainer, toast } from 'react-toastify'
import Logo from "../../images/logo/LOGO1.png";
import BottomBar from "../BottomBar/BottomBar";
import AboutPage from '../AboutPage/AboutPage';

class App extends Component {

  state = {
    search: '',
    events: [],
    userCoordinates: [],
    nearestRadius: 10000,
    clickedEvent: '',
    user: null,
    userCreatedEvents: false,
    userAttendedEvents: false,
    logoClicked: false,
    sortedByPlaces: false,
    nearestFound: false
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
        userHasFavoriteEvents: false,
        sortedByPlaces: false
      })
    })
  };

  getUserCreatedEvents = () => {
    this.getEvents()
    database.ref(`/users/${this.state.user.uid}/created`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          const value = Object.keys(snapshot.val()) || this.state.events;
          const events = this.state.events;
          const userCreated = events.filter(event => value.indexOf(event.id) > -1);
          this.setState({
            events: userCreated,
            userCreatedEvents: true,
          })
        }
        else {
          toast.error('Nie zapisałeś się na wydarzenia')
        }
      })
  };

  getEventsUserAttend = () => {
    this.getEvents()
    database.ref(`/users/${this.state.user.uid}/subscribed`)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          const value = Object.keys(snapshot.val()) || this.state.events;
          const events = this.state.events;
          const userAttends = events.filter(event => value.indexOf(event.id) > -1);
          this.setState({
            events: userAttends,
            userAttendedEvents: true,
          })
        }
        else {
          toast.error('Nie zapisałeś się na wydarzenia')
        }
      })
  };

  getUsersFavoriteEvents = () => {
    this.getEvents()
    database.ref(`/users/${this.state.user.uid}/favorite/`)
    .once('value', snapshot => {
      if (snapshot.exists()) {
        const value = Object.keys(snapshot.val()) || this.state.events
        const events = this.state.events
        const userFavorites = events.filter(event => value.indexOf(event.id) > -1)
        this.setState({
            events: userFavorites,
            userHasFavoriteEvents: true,
        })
      } else {
        toast.error('Nie obserwujesz żadnych wydarzeń')
      }
    })
  };

  sortByPlaces = () => {
    const events = [...this.state.events]
    const sortedEvents = events.sort((a, b) => b.freeSlots - a.freeSlots)
    this.setState({
      events: sortedEvents,
      sortedByPlaces: true
    })
  }

  findNearest = (userCoords) => {
    const events = this.state.events
    const closestEvents = events.filter(event =>
       L.latLng(userCoords)
       .distanceTo(event.coordinates) < this.state.nearestRadius)
    this.setState({
      events: closestEvents,
      nearestFound: true
    })
  }

  findLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.findNearest([position.coords.latitude, position.coords.longitude])
      })
    }
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

  toggleListItem = () => {
    this.setState({
      logoClicked: !this.state.logoClicked
    })
  }
  
  render() {
      const searchCriteria = this.state.events.filter(
          (event) => {
              return event.technology.toLowerCase().indexOf(this.state.search) !== -1
                    || event.tags.some(tag => tag.includes(this.state.search))
                    || event.title.toLowerCase().indexOf(this.state.search) !== -1
        });
    return (
      <div className="App" >
        <div className="top_bar">
          <img
            alt="logo"
            className="top_bar_logo"
            src={Logo}
            title="O projekcie"
            onClick={() => this.toggleListItem()}
          />
          <span
            className="logo_text"
          >
              We got
          <span
            className="logo_text_it"
          >it
          </span>
          </span>
          <input
            className = "event_search-input"
            type = "text"
            placeholder = 'Wyszukaj...'
            value={this.state.search}
            onChange = {event=>this.handleSearchCriteria(event.currentTarget.value)}
          />
            {
              this.state.user &&
                <ButtonsUserEvents
                  getUserCreatedEvents={this.getUserCreatedEvents}
                  getEventsUserAttend={this.getEventsUserAttend}
                  getUsersFavoriteEvents={this.getUsersFavoriteEvents}
                  revertView={this.handleRevertView}
                  getEvents={this.getEvents}
                  userEvents={this.state.userCreatedEvents}
                  userAttend={this.state.userAttendedEvents}
                  userHasFavorites={this.state.userHasFavoriteEvents}
                  sortByPlaces={this.sortByPlaces}
                  sortedByPlaces={this.state.sortedByPlaces}
                  nearestFound={this.state.nearestFound}
                  searchForNearest={this.findLocation}
                />
            }
          <Login
            getUser={this.handleUser}
            getEvents={this.getEvents}
          />
        </div>
          <div className="list_container">
            {
              !this.state.logoClicked ?
              (
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
                getEvents={this.getEvents}
                handleCloseItem={this.handleCloseItem}
              />
              ) : (
                <AboutPage />  
              )
            }
          </div>
          <NewEventDisplay
            events={this.state.events}
            getEvents={this.getEvents}
            callback={this.handleCallback}
            clickedEvent={this.state.clickedEvent}
            user={this.state.user}
          />
          <BottomBar />
          <ToastContainer autoClose={1500}/>
      </div>
    );
  }
}

export default App;
