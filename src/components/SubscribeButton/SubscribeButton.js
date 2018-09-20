import React, { Component } from 'react';

class SubscribeButton extends Component {

  handleEventSlots = (id) => {
    this.props.handleEventSlots(id)
  };

  render () {
    return (
      <div>
        <button onClick={() => this.props.userSubscribed || !this.props.user ?
                               alert('Already subscribed') :
                               this.handleEventSlots(this.props.eventId)}
        >
          Subscribe event!
        </button>
      </div>
    )
  }
}

export default SubscribeButton