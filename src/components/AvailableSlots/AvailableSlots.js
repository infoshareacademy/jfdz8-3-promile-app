import React, {Component} from 'react'

class AvailableSlots extends Component {

    render() {
        const freeSlotsNumber = this.props.plannedSlots;
        const slots = Array(parseInt(freeSlotsNumber)).fill(0);
        return (
          <div>
            {slots.map(item =>
              <div className="freeSlot">
              </div>
            )}
          </div>
        )
      }
}

export default AvailableSlots