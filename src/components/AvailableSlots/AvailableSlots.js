import React, {Component} from 'react'

class AvailableSlots extends Component {

    state = {
      visible: !this.props.visibility
    }

    componentDidUpdate(nextProps) {
      if (nextProps.visibility !== this.props.visibility) {
        this.setState({
          visible: this.props.visibility
        })
      }
    }

    render() {
        const visibility = this.state.visible ? "visible" : "unvisible";
        const freeSlotsNumber = this.props.plannedSlots;
        const slots = Array(parseInt(freeSlotsNumber)).fill(0);
        return (
          <div>
            {slots.map(item =>
              <div className={`freeSlot ${visibility}`}>
              </div>
            )}
          </div>
        )
      }
}

export default AvailableSlots