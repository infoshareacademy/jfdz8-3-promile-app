import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class MainMap extends Component {
  state = {
    markers: [[54.405, 18.61], [54.40, 18.59], [54.40, 18.60], [54.41, 18.605]],
    userMarkers: [[0, 0]]
  };

  clickHandler = (e) => {
    if (this.props.newMarker) {
      this.state.userMarkers.push([e.latlng.lat, e.latlng.lng]);
      this.state.userMarkers = this.state.userMarkers.slice(-1);
      this.setState({userMarkers: this.state.userMarkers})
    } else {
      alert ('MAP IS BLOCKED')
    }
  };

  render() {
    const position = [54.40, 18.60];
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
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
          {this.state.markers.map((coordinates, id) =>
              <Marker key={`marker-${id}`} position={coordinates}>
              <Marker key={`marker-${id}`} position={this.state.userMarkers[0]} />
            <Popup>
              <div className="popup">
              <span>Wanna add an Event?</span>
                <p>PLACE</p>
                <p>People</p>
                <button>GIVE LIKE</button>
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