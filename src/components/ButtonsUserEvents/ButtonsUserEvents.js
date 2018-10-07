import React, { Component } from 'react';

class ButtonsUserEvents extends Component {

  getUserCreatedEvents = () => {
    this.props.revertView()
    this.props.getUserCreatedEvents()
  };

  getEventsUserAttend = () => {
    this.props.revertView()
    this.props.getEventsUserAttend()
  };

   getUsersFavoriteEvents = () => {
    this.props.revertView()
    this.props.getUsersFavoriteEvents()
    }

  getEvents = () => {
    this.props.getEvents()
  };

  sortByPlaces = () => {
    this.props.revertView()
    this.props.sortByPlaces()
  }

  searchForNearest = () => {
    this.props.revertView()
    this.props.searchForNearest()
  }

  render() {
    return(
      <div className="event_user_buttons-container">
        <button
          className="event_user_button my_events"
          onClick={ () => this.props.userEvents ?
                          this.getEvents() :
                          this.getUserCreatedEvents()
          }
        >
          {this.props.userEvents ? 'Wszystkie' : 'Stworzone'}
        </button>

        <button className="event_user_button my_participation_events"
                onClick={ () => this.props.userAttend ?
                                this.getEvents() :
                                this.getEventsUserAttend() }
        >{this.props.userAttend ? 'Wszystkie' : 'Uczestniczę'}
        </button>
        
        <button
          className="event_user_button my_favourite_events"
          onClick={ () => this.props.userHasFavorites ?
                          this.getEvents() :
                          this.getUsersFavoriteEvents()}
        >
          {this.props.userHasFavorites ? 'Wszystkie' : 'Ulubione'}
        </button>

        <button
          className="event_user_button my_favourite_events"
          onClick={ () => this.props.sortedByPlaces ?
                          this.props.getEvents() : 
                          this.sortByPlaces()}
        >
        {this.props.sortedByPlaces ? 'Wszystkie' : 'Dostępne'}
        </button>

        <button
          className="event_user_button my_favourite_events"
          onClick={ () => this.props.nearestFound ?
                          this.props.getEvents() : 
                          this.searchForNearest()}
        >
        {this.props.nearestFound ? 'Wszystkie' : 'Blisko'}
        </button>
        
      </div>
    )
  }
}

export default ButtonsUserEvents