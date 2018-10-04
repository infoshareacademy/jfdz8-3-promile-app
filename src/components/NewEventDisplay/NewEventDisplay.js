import React, { Component } from 'react';
import MainMap from '../Map/Map';
import { database } from '../FirebaseConfig/FirebaseConfig';
import { toast } from 'react-toastify'

class NewEventDisplay extends Component {

  state = {
    events: [],
    visible: false,
    mapBlocked: false,
    title: '',
    address: '',
    technology: 'JavaScript',
    coordinates: [],
    slots: '',
    arePlacesAvailable: true,
    description: '',
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
      this.state.title,
      this.state.address
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
  };

  clearInputs = () => {
    this.setState({
      events: [],
      visible: false,
      mapBlocked: true,
      title: '',
      address: '',
      technology: 'JavaScript',
      coordinates: [],
      slots: '',
      arePlacesAvailable: true,
      description: '',
      date: this.defaultDate(),
      time: this.defaultTime(),
      tags: [],
    })
  }

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
    this.clearInputs()
    const newEvent = {
      title: this.state.title,
      technology: this.state.technology,
      coordinates: this.state.coordinates,
      address: this.state.address,
      description: this.state.description,
      slots: this.state.slots,
      freeSlots: parseInt(this.state.slots, 10),
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
    if (event.target.value > 10 && event.target.value !== 0 && event.target.value !== 1) {
      toast.warn("Maksymalna liczba uczestników to 10")
       event.target.value = '';
      this.setState({
          slots: event.target.value
      })
    } else if(event.target.value < 2){
        toast.warn("Minimalna liczba uczestników to 2")
        event.target.value = '';
        this.setState({
            slots: event.target.value
        })
    }
  };

  handleAttendeesInput = (event) => {
      this.setState({
          slots: event.target.value
      })
  }

  addAddress = (event) => {
    this.setState({
        address: event.target.value
    })
  }

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
          findNearest={this.props.findNearest}
          searchForNearest={this.props.searchForNearest}
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
            <p>Nazwa wydarzenia: </p>
            <input
              type="text"
              value={this.state.title}
              placeholder="Nazwij wydarzenie"
              onChange={this.changeTitle}
            />
          </div>
          <div className="new_event_technology-container">
            <p>Technologia:</p>
            <select value={this.state.value} onChange={this.changeSelect}>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="SQL">SQL</option>
              <option value="PHP">PHP</option>
              <option value="React">React</option>
              <option value="Angular">Angular</option>
              <option value="Cplus">C++</option>
              <option value="GameDev">Game Development</option>
              <option value="Html">HTML</option>
              <option value="Node">NodeJS</option>
              <option value="Ruby">Ruby</option>
              <option value="CSS">UI/UX</option>
            </select>
          </div>
          <div className="new_event_time_date_picker">
            <p>Data: </p><input type="date" value={this.state.date} onChange={this.changeDate} />
            <p>Godzina: </p><input type="time" value={this.state.time} onChange={this.changeTime} />
            <p>Adres: </p><input type="address" value={this.state.address} onChange={this.addAddress} />
          </div>
          <div className="new_event_tags_and_slots-container">
            <div className="new_event_number_of_slots">
              <input type="text" placeholder="Liczba uczestników" value={this.state.slots}  onChange={this.handleAttendeesInput} onBlur={this.addAttendees}/>
            </div>
            <div className="new_event_tags">
              <input 
                type="text"
                placeholder="Tagi (po przecinku)"
                value={this.state.tags}
                onChange={this.addTags}
              />
            </div>
          </div>
            <div className="new_event_description">
              <textarea
                value={this.state.description}
                onChange={this.changeDescription}
                rows="10"
                cols="40"/>
            </div>
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