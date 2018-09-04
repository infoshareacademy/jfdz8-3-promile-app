import React, {Component} from 'react'

class AvailableSlots extends Component {
    //
    // componentDidUpdate(nextProps) {
    //   if (nextProps.visibility !== this.props.visibility) {
    //     this.setState({
    //       visible: this.props.visibility
    //     })
    //   }
    // }

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