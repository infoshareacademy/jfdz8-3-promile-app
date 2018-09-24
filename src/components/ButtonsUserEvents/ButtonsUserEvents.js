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
        >{this.props.userEvents ? 'Wszystkie wydarzenia' : 'Pokaż stworzone przeze mnie'}
        </button>

        <button onClick={ () => this.props.userAttend ?
                                this.getEvents() :
                                this.getEventsUserAttend() }
        >{this.props.userAttend ? 'Wszystkie wydarzenia' : 'Pokaż w których uczestniczę'}
        </button>
      </div>
    )
  }
}

export default ButtonsUserEvents