import React, { Component } from 'react'
import AvailableSlots from '../AvailableSlots/AvailableSlots';


class EventDetails extends Component {
  render() {
    return (
      <div>
        <p>{this.props.singleEvent.description}</p>
        <p>{this.props.singleEvent.date}</p>
        <p>{this.props.singleEvent.time}</p>
        <AvailableSlots plannedSlots={this.props.singleEvent.slots}
                        visibility={this.props.visible}
        />
        <p>{console.log(this.props.visible)}</p>
      </div>
    )
  }
}

export default EventDetails