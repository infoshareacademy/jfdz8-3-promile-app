import React, {Component} from 'react';
import { database } from "../FirebaseConfig/FirebaseConfig";

class AvailableSlots extends Component {

  state = {
    event: this.props.event,
    clicked: false,
    user: this.props.user,
    userSubscribed: false
  };

  handleEventSlots = (id) => {
    database.ref(`/events/${id}/freeSlots`)
      .set(this.state.event.freeSlots - 1);
    database.ref(`/users/${this.state.user.uid}/subscribed/${id}`)
      .set(id);
  };

  handleIfSubscrubed = () => {
    database.ref(`/users/${this.state.user.uid}/subscribed/${this.state.event.id}`)
      .on('value', snapshot => !snapshot.val() ? false : this.setState({ userSubscribed: true }))
  };

  componentDidUpdate(nextProps) {
    if (nextProps.event !== this.props.event) {
      this.setState({
        event: this.props.event
      })
    }
  }

  componentDidMount() {
    this.handleIfSubscrubed()
  }

  render() {
    const eventSlots = this.state.event.slots;
    const slots = Array(parseInt(eventSlots, 10)).fill(0);

    return(
      <div>
        {slots.map((item, index) =>
          <div key={index}
               className="freeSlot"
               onClick={() => this.state.userSubscribed ?
                              alert('Already subscribed') :
                              this.handleEventSlots(this.state.event.id)}
          >
          </div>
        )}
      </div>
    )
  }
}

export default AvailableSlots