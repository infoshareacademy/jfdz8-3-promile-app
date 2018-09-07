import React, { Component } from 'react'
import AvailableSlots from '../AvailableSlots/AvailableSlots';

class EventDetails extends Component {

  state = {
    active: false
  };

  componentDidUpdate(nextProps) {
    if (nextProps.clicked !== this.props.clicked) {
      this.setState({
        active: this.props.clicked
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.active &&
        <div>
          <p>{this.props.singleEvent.description}</p>
          <p>{this.props.singleEvent.date}</p>
          <p>{this.props.singleEvent.time}</p>
          <AvailableSlots event={this.props.singleEvent} />
        </div>
        }
      </div>
    )
  }
}

export default EventDetails