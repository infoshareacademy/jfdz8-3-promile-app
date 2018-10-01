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
          {this.props.userEvents ? 'Wszystkie wydarzenia' : 'Pokaż stworzone przeze mnie'}
        </button>

        <button className="event_user_button my_participation_events"
                onClick={ () => this.props.userAttend ?
                                this.getEvents() :
                                this.getEventsUserAttend() }
        >{this.props.userAttend ? 'Wszystkie wydarzenia' : 'Pokaż w których uczestniczę'}
        </button>
        
        <button
          className="event_user_button my_favourite_events"
          onClick={ () => this.props.userHasFavorites ?
                          this.getEvents() :
                          this.getUsersFavoriteEvents()}
        >
          {this.props.userHasFavorites ? 'Wszystkie wydarzenia' : 'Pokaż ulubione'}
        </button>
      </div>
    )
  }
}

export default ButtonsUserEvents