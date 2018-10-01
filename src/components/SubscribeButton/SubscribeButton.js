import React, { Component } from 'react';
import { toast } from 'react-toastify'

class SubscribeButton extends Component {

  handleEventSlots = (id) => {
    this.props.handleEventSlots(id)
  };

  userNotLoggedNotification = () => {if (this.props.user) {
      this.handleEventSlots(this.props.event.id)
  } else {
      toast.warn("Zaloguj się")
  } };
  render () {
    return (
      <div>
        {
          this.props.event.freeSlots ?
          <button className="event_register_button" onClick={this.userNotLoggedNotification}
          >
            {
              !this.props.user? 'Zarejestruj się':
                this.props.userSubscribed? 'Zrezygnuj' :
                'Zapisz się'
            }
          </button>

          : this.props.user && this.props.userSubscribed ? 

          <button className="event_register_button" onClick={this.userNotLoggedNotification}
          >
            Zrezygnuj
          </button>
          :
          <p>Brak wolnych miejsc...</p>
        }

      </div>
    )
  }
}

export default SubscribeButton