import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class SubscribeButton extends Component {

  handleEventSlots = (id) => {
    this.props.handleEventSlots(id)
  };

  userNotLoggedNotification = () => {if (this.props.user) {
      toast.success("You are already logged")
  } else {
      toast.warn("You gotta be logged")
  } }
  render () {
    return (
      <div>
         <ToastContainer/>
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