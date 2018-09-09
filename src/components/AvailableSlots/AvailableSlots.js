import React, {Component} from 'react';
import { database } from "../FirebaseConfig/FirebaseConfig";

class AvailableSlots extends Component {

  state = {
    event: this.props.event
  };

    handleEventSlots = (id) => {
      this.setState({
        event: {
          ...this.state.event,
          freeSlots: this.state.event.freeSlots - 1
        }
      });
      database.ref(`/events/${id}`)
        .set(this.state.event)
    };

    render() {
        const freeSlotsNumber = this.state.event.freeSlots;
        const slots = Array(parseInt(freeSlotsNumber)).fill(0);
        
        return(
          <div>
            {slots.map(item =>
              <div 
              onClick={() => this.handleEventSlots(this.state.event.id)} className="freeSlot">
              </div>
            )}
          </div>
        )
      }
}

export default AvailableSlots