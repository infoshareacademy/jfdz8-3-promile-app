import React, { Component } from 'react';

class SubscribeButton extends Component {

  handleEventSlots = (id) => {
    this.props.handleEventSlots(id)
  };

  render () {
    return (
      <div>
        <button onClick={() => !this.props.user ? alert('Register first!') :
                               this.props.userSubscribed ? alert('Already subscribed') :
                               this.handleEventSlots(this.props.eventId)}
        >
          Subscribe event!
        </button>
      </div>
    )
  }
}

export default SubscribeButton