import React, { Component } from 'react'
import MainMap from '../Map/Map'

class NewEventDisplay extends Component {

  state = {
    visible: false,
    mapBlocked: false,
    technology: '',
    coordinates: [],
    description: 'Put here description'
};

  showNewEventPanel = () => {
    this.setState({
      visible: !this.state.visible
    })
  };

  toggleMapBlock = () => {
    this.setState({
      mapBlocked: !this.state.mapBlocked
    }, function() {
      })
  };

  addEvent = (event) => {
    event.preventDefault();
    const newContact = {
      coordinates: this.state.coordinates,
      technology: this.state.technology,
      description: this.state.description
    };
    fetch(
      'http://localhost:3000/events', {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
          'Content-type': 'application/json'
        }
      }
    ).then(this.props.getEvents)
  };

  getCoordinates = (event) => {
    this.setState({
      coordinates: [event.latlng.lat, event.latlng.lng]
    })

  };

  changeDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  };

  changeSelect = (event) => {
    this.setState({
      technology: event.target.value,
    })
  };

  componentDidMount() {
    this.props.getEvents();
  }

  render() {

    const visibility = this.state.visible ? "visible" : "unvisible";
    return (
      <div>
        <MainMap newMarker={this.state.mapBlocked}
                 getCoordinates={this.getCoordinates}
        />
        <div>
          <button onClick={this.showNewEventPanel}> Create new Event</button>
        </div>
        <div className={`new-event ${visibility}`}>
          <select value={this.state.value} onChange={this.changeSelect}>
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
          <textarea value={this.state.description} onChange={this.changeDescription} rows="5" cols="50"></textarea>
          <button onClick={this.addEvent}>Create Event!</button>
          <p>{this.getCoordinates}</p>
        </div>
    </div>
    )
  }
}

export default NewEventDisplay