import React, { Component } from 'react';
import MainMap from '../Map/Map';
import { database } from '../FirebaseConfig/FirebaseConfig';
import { toast } from 'react-toastify'

class NewEventDisplay extends Component {

  state = {
    events: [],
    visible: false,
    mapBlocked: false,
    title: 'New',
    technology: 'JavaScript',
    coordinates: [],
    slots: '2',
    arePlacesAvailable: true,
    description: 'Description',
    date: '',
    time: '',
    tags: [],
};

  componentDidMount() {
    this.setState({
      date: this.defaultDate(),
      time: this.defaultTime()
    })
  }

  defaultDate = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day
    }
    const dateNow = `${year + '-' + month + '-' + day}`;
    return dateNow
  };

  defaultTime = () => {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    const time = `${hours + ':' + minutes}`;
    return time
  };

  validateInputs = (event) => {
    const textInputs = Array.of(
      this.state.slots,
      this.state.description,
      this.state.title
    );
    const arrayInputs = Array.of(
      this.state.coordinates,
      this.state.tags
    );
    const textInputsCheck = textInputs.filter(item => item === '').length;
    const arrayInputsCheck = arrayInputs.filter(item => item.length === 0).length
    return textInputsCheck || arrayInputsCheck ?
      toast.error('Niektóre pola nie zostały wypełnione!') :
      this.addEvent(event)
      ;
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
      tags: this.state.tags,
      creator: this.props.user.uid
    };

  const db = database.ref('/events');
  const dbRef = db.push(newEvent);
  database.ref(`/users/${this.props.user.uid}/created/${dbRef.key}`)
    .set(dbRef.key)
  .then(() => {
    this.setState({
      visible: false
    });
    toast.success("Dodano wydarzenie")
  }).then(this.toggleMapBlock)
    .then(this.props.getEvents)
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
  };

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
        <div className="add_event-container">
          {
            this.props.user &&
            <button className="add_event_button" onClick={this.showNewEventPanel}>+</button>
          }
        </div>
        <div className={`new_event-container ${visibility}`}>
        <div className="new_event_details">
            <div className="new_event_name-container">
                <input
                    type="text"
                    value={this.state.title}
                    placeholder="Nazwij wydarzenie"
                    onChange={this.changeTitle}/>
            </div>
            <div className="new_event_technology-container">
                <select value={this.state.value} onChange={this.changeSelect}>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="SQL">SQL</option>
                    <option value="PHP">PHP</option>
                </select>
            </div>
          <div className="new_event_time_date_picker">
            <input type="date" value={this.state.date} onChange={this.changeDate} />
            <input type="time" value={this.state.time} onChange={this.changeTime} />
          </div>
          <div className="new_event_number_of_slots">
            <input type="text" placeholder="Liczba uczestników" value={this.state.slots} onChange={this.addAttendees}/>
          </div>
          <div className="new_event_description">
            <input type="text"
                   placeholder="Tagi po przecinku"
                   value={this.state.tags}
                   onChange={this.addTags}
            />
          </div>
          <textarea value={this.state.description} onChange={this.changeDescription} rows="5" cols="50"/>
          <div className="add_event_buttons-container">
          <button
              className="add_event_on_map"
              onClick={this.toggleMapBlock}>
              Dodaj na mapie
          </button>
          <button
              className="add_event_create_event"
              onClick={this.validateInputs}>
              Utwórz wydarzenie!
          </button>
          </div>
        </div>
        </div>
    </div>
    )
  }
}

export default NewEventDisplay