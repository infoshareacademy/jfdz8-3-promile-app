import React, { Component } from 'react';

class ButtonsUserEvents extends Component {

  getUserCreatedEvents = () => {
    this.props.getUserCreatedEvents()
  };

  getEventsUserAttend = () => {
    this.props.getEventsUserAttend()
  };

  getEvents = () => {
    this.props.getAllEvents()
  };

  render() {
    return(
      <div>
        <button onClick={ () => this.props.userEvents ? this.getEvents() : this.getUserCreatedEvents() }>Show events I created</button>
        <button onClick={ () => this.props.userAttend ? this.getEvents() : this.getEventsUserAttend() }>Show event I attend to</button>
      </div>
    )
  }
}

export default ButtonsUserEvents