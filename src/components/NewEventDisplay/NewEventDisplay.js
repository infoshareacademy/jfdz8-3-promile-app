import React, { Component } from 'react';
import MainMap from '../Map/Map';
import { database } from '../FirebaseConfig/FirebaseConfig';

class NewEventDisplay extends Component {

  state = {
    events: [],
    visible: false,
    mapBlocked: false,
    title: 'New',
    technology: '',
    coordinates: [],
    slots: '2',
    arePlacesAvailable: true,
    description: 'Description',
    date: '2018-08-09',
    time: '13:00',
    tags: []
};

  showNewEventPanel = () => {
    this.setState({
      visible: !this.state.visible
    })
  };

  toggleMapBlock = () => {
    this.setState({
      mapBlocked: !this.state.mapBlocked
    })
  };

  addEvent = (event) => {
    event.preventDefault();
    const newEvent = {
      title: this.state.title,
      technology: this.state.technology,
      coordinates: this.state.coordinates,
      description: this.state.description,
      slots: this.state.slots,
      freeSlots: this.state.slots,
      date: this.state.date,
      time: this.state.time,
      tags: this.state.tags
    };

    database.ref('/events')
      .push(newEvent)

    .then(() => {
      this.setState({
        visible: false
      });
      alert('ADDED')
    }).then(this.toggleMapBlock).then(this.props.getEvents)
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

  changeDate = (event) => {
    this.setState({
      date: event.target.value
    })
  };

  changeTime = (event) => {
    this.setState({
      time: event.target.value
    })
  };

  addAttendees = (event) => {
    this.setState({
      slots: event.target.value
    })
  };

  changeSelect = (event) => {
    this.setState({
      technology: event.target.value
    })
  };

  changeTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  };

  addTags = (event) => {
    this.setState({
        tags: event.target.value.split(",").map(tag => tag.trim())
    })
  }

  render() {

    const visibility = this.state.visible ? "visible" : "unvisible";
    return (
      <div>
        <MainMap
          events={this.props.events}
          newMarker={this.state.mapBlocked}
          getCoordinates={this.getCoordinates}
          handleCallback={this.props.callback}
          clicked={this.props.clickedEvent}
        />
        <div>
          <button onClick={this.showNewEventPanel}>Create new Event</button>
        </div>
        <div className={`new-event ${visibility}`}>
          <input type="text" value={this.state.title} placeholder="Name your event" onChange={this.changeTitle}/>
          <select value={this.state.value} onChange={this.changeSelect}>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="SQL">SQL</option>
            <option value="PHP">PHP</option>
          </select>
          <div className="timePicker">
            <input type="date" value={this.state.date} onChange={this.changeDate} />
            <input type="time" value={this.state.time} onChange={this.changeTime} />
          </div>
          <div className="numberOfSlots">
            <input type="text" placeholder="Number of attendees" value={this.state.slots} onChange={this.addAttendees}/>
          </div>
          <div>
            <input type="text"
                   placeholder="Type event tags ie. JavaScript"
                   value={this.state.tags}
                   onChange={this.addTags}
            />
          </div>
          <textarea value={this.state.description} onChange={this.changeDescription} rows="5" cols="50"/>
          <button onClick={this.toggleMapBlock}>Add Event on map</button>
          <button onClick={this.addEvent}>Create Event!</button>
        </div>
    </div>
    )
  }
}

export default NewEventDisplay