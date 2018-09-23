import React, { Component } from 'react';
import { toast } from 'react-toastify'

class SubscribeButton extends Component {

  handleEventSlots = (id) => {
    this.props.handleEventSlots(id)
  };

  userNotLoggedNotification = () => {if (this.props.user) {
      this.handleEventSlots(this.props.eventId)
  } else {
      toast.warn("Najpierw się zaloguj")
  } };
  render () {
    return (
      <div>
        <button onClick={this.userNotLoggedNotification}
        >
          {
            !this.props.user? 'Zarejestruj się':
             this.props.userSubscribed? 'Zrezygnuj' :
               'Zapisz się'
          }
        </button>
      </div>
    )
  }
}

export default SubscribeButton