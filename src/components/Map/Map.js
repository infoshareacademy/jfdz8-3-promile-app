import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class MainMap extends Component {
  state = {
    markers: [[54.405, 18.61], [54.40, 18.59], [54.40, 18.60], [54.41, 18.605]],
    events: [],
    userMarkers: [[0, 0]]
  };

  clickHandler = (e) => {
    if (this.props.newMarker) {
      this.state.userMarkers.push([e.latlng.lat, e.latlng.lng]);
      this.state.userMarkers = this.state.userMarkers.slice(-1);
      this.setState({userMarkers: this.state.userMarkers});
      this.props.getCoordinates(e)
    } else {
      alert ('MAP IS BLOCKED')
    }
  };

  getEvents = () => {
    fetch(`http://localhost:3000/events`)
      .then(results => {
        return results.json()
      })
      .then(eventList => {
        this.setState({
          events: eventList
        })
      })
  }

  componentDidMount() {
    this.getEvents()
  }

  render() {
    const position = [54.40, 18.60];
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [24,36],
      iconAnchor: [12,36]
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    return (
      <div>
        <Map
          center={position}
          zoom={13}
          onClick={this.clickHandler}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.state.events.map((event, id) =>
              <Marker key={`marker-${id}`} position={event.coordinates}>
              <Marker key={`marker-${id}`} position={this.state.userMarkers[0]} />
            <Popup>
              <div className="popup">
              <span>{event.description}</span>
                <p>Technology {event.technology}</p>
                <p>When? {event.date}</p>
                <p>What time? {event.time}</p>
                <button>Join</button>
              </div>
            </Popup>
          </Marker>
          )}
        </Map>
      </div>
    );
  }
}

export default MainMap;