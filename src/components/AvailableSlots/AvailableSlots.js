import React, { Component } from 'react';

class AvailableSlots extends Component {

  componentDidUpdate(nextProps) {
    if (nextProps.event !== this.props.event) {
      this.setState({
        event: this.props.event
      })
    }
  }

  render() {
    const freeSlots = this.props.event.freeSlots;
    const slots = Array(parseInt(freeSlots, 10)).fill(0);

    return(
      <div>
        {slots.map((item, index) =>
          <div key={index}
               className="freeSlot"
          >
          </div>
        )}
      </div>
    )
  }
}

export default AvailableSlots