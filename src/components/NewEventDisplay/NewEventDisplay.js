import React, { Component } from 'react'

class NewEventDisplay extends Component {

  state = {
    visible: false,
    mapBlocked: false
};

  showNewEventPanel = () => {
    this.setState({
      visible: !this.state.visible
    })
  };

  toggleMapBlock = () => {
    this.setState({
      mapBlocked: !this.state.mapBlocked
    });
    console.log(this.state.mapBlocked)
  };

  render() {

    const visibility = this.state.visible ? "visible" : "unvisible";

    return (
      <div>
        <div>
          <button onClick={this.showNewEventPanel}> Create new Event</button>
        </div>
        <div className={`new-event ${visibility}`}>
          <select>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="SQL">SQL</option>
            <option value="PHP">PHP</option>
          </select>
          <button onClick={this.toggleMapBlock}>Add Event on map</button>
          <div className="timePicker">
            <input type="date" />
            <input type="time" />
          </div>
          <textarea rows="5" cols="50"></textarea>
          <button>Create Event!</button>
        </div>
    </div>
    )
  }
}

export default NewEventDisplay