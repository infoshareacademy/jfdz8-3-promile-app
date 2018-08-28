import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import pyIcon from '../../images/technologies_logo/python.png'
import jsIcon from '../../images/technologies_logo/js.png'
import javaIcon from '../../images/technologies_logo/java.png'
import dbIcon from '../../images/technologies_logo/database.png'
import phpIcon from '../../images/technologies_logo/php.png'

const markers = {
  Python: pyIcon,
  SQL: dbIcon,
  Java: javaIcon,
  PHP: phpIcon,
  JavaScript: jsIcon
};

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

  handleClickCallback = data => {
    this.props.handleCallback(data)
  };

  findLocation = () => {
    if ('geolocation' in navigator) {
    (navigator.geolocation.getCurrentPosition(function(position) {
          alert(position.coords.latitude + ' ' + position.coords.longitude);
      }))
    }
  }

  render() {
    const position = [54.40, 18.60];
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [30, 30],
      iconAnchor: [12, 36],
      popupAnchor: [0, -25],
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

            <Marker key={`marker-${id}`}
                    position={event.coordinates}
                    icon={Object.assign(Object.create(Object.getPrototypeOf(DefaultIcon)), DefaultIcon, {
                      options: {
                        ...DefaultIcon.options,
                        iconUrl: markers[event.technology]
                      }})
                    }
                    onClick={() => this.handleClickCallback(event.id)}
            >
              <Popup>
                <div className="popup">
                  <h1>{event.title}</h1>
                  <p>Technology: {event.technology}</p>
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
          <button onClick={this.findLocation}>Geolocation</button>
      </div>
    );
  }
}

export default MainMap;