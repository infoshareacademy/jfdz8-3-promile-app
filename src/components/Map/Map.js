import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class MainMap extends Component {
  state = {
    markers: [[54.35, 18.7], [54.37, 18.65]]
  };

  clickHandler = (e) => {
    this.state.markers.push([e.latlng.lat, e.latlng.lng]);
    this.setState({markers: this.state.markers})
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