import React, { Component } from 'react';
import { toast } from 'react-toastify'

class SubscribeButton extends Component {

  handleEventSlots = (id) => {
    this.props.handleEventSlots(id)
  };

  userNotLoggedNotification = () => {if (this.props.user) {
      this.handleEventSlots(this.props.eventId)
  } else {
      toast.warn("Log first to subscribe event!")
  } };
  render () {
    return (
      <div>
        <button onClick={this.userNotLoggedNotification}
        >
          {
            !this.props.user? 'Register to subscribe!':
             this.props.userSubscribed? 'Unsubscribe event!' :
               'Subscribe Event!'
          }
        </button>
      </div>
    )
  }
}

export default SubscribeButton