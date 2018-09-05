import React, {Component} from 'react'

class AvailableSlots extends Component {

  state = {
    event: this.props.event
  }

  updateSlotsNumber = (id) => {
    const updatedEvent = this.state.event 
    fetch(
      `http://localhost:3000/events/${id}`, {
       method:'PUT',
       body: JSON.stringify(updatedEvent),
       headers: {
        'Content-Type': 'application/json'
      }
      })

    };

    handleEventSlots = (id) => {
      this.setState({
        event: {
          ...this.state.event,
          freeSlots: this.state.event.freeSlots - 1
        }
      })
      this.updateSlotsNumber(id)
    }

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