import React, {Component} from 'react';
import { database } from "../FirebaseConfig/FirebaseConfig";

class AvailableSlots extends Component {

  state = {
    event: this.props.event,
    clicked: false,
    user: this.props.user,
  };

  handleEventSlots = (id) => {
    database.ref(`/events/${id}/freeSlots`)
      .set(this.state.event.freeSlots - 1);
    database.ref(`/users/${this.state.user.uid}/subscribed/${id}`)
      .set(id);
    //database.ref(`/events/${id}/attendees/${this.state.user.uid}`)
  };

  componentDidUpdate(nextProps) {
    if (nextProps.event !== this.props.event) {
      this.setState({
        event: this.props.event
      })
    }
  }

  render() {
    const eventSlots = this.state.event.slots;
    const slots = Array(parseInt(eventSlots)).fill(0);

    return(
      <div>
        {slots.map((item, index) =>
          <div key={index}
          onClick={() => this.handleEventSlots(this.state.event.id)} className="freeSlot">
          </div>
        )}
      </div>
    )
  }
}

export default AvailableSlots