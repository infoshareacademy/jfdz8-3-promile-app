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
        <button onClick={ () => this.props.userEvents ?
                                this.getEvents() :
                                this.getUserCreatedEvents() }
        >{this.props.userEvents ? 'Show All Events' : 'Show Events I created'}
        </button>

        <button onClick={ () => this.props.userAttend ?
                                this.getEvents() :
                                this.getEventsUserAttend() }
        >{this.props.userAttend ? 'Show All Events' : 'Show Events I attend to'}
        </button>
      </div>
    )
  }
}

export default ButtonsUserEvents