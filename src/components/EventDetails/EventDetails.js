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
        <p>{this.props.singleEvent.description}</p>
        <p>{this.props.singleEvent.date}</p>
        <p>{this.props.singleEvent.time}</p>
        {this.state.active &&
        <AvailableSlots plannedSlots={this.props.singleEvent.slots}
        />
        }
      </div>
    )
  }
}

export default EventDetails