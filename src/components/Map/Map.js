import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class MainMap extends Component {
  state = {
    userMarkers: []
  };

  clickHandler = (e) => {
    if (this.props.newMarker) {
      this.setState({userMarkers: [[e.latlng.lat, e.latlng.lng]]});
      this.props.getCoordinates(e)
    } else {
      alert('MAP IS BLOCKED')
    }
  };

  render() {
    const position = [54.40, 18.60];
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [24, 36],
      iconAnchor: [12, 36]
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

          {this.props.events.map((event, id) =>
            <Marker key={`marker-${id}`} position={event.coordinates}>
              <Popup>
                <div className="popup">
                  <h1>{event.title}</h1>
                  <p>{event.description}</p>
                  <p>Technology: {event.technology}</p>
                  <p>When? {event.date}</p>
                  <p>What time? {event.time}</p>
                  <p>Number of attendees: {event.slots}</p>
                  <button>Join</button>
                </div>
              </Popup>
            </Marker>
          )}
          {
            this.props.newMarker && this.state.userMarkers.map(
              position =>  <Marker key={position.toString()} position={position} />
            )
          }
        </Map>
      </div>
    );
  }
}

export default MainMap;