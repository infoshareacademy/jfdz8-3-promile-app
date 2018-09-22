import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
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
    userMarkers: [],
    userCoordinates: [54.5, 18.5],
    activeEvent: this.props.clicked,
    zoom: 6
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
    this.props.handleCallback(data);
    this.setState({
      activeEvent: this.props.clicked
    })
  };

  showUserPosition = (coords) => {
    this.setState ({
        userCoordinates: coords,
        zoom: 12
    })};

  componentDidUpdate(nextProps) {
    if (nextProps.clicked !== this.props.clicked) {
      this.setState({
        activeEvent: this.props.clicked,
        userCoordinates: this.props.clicked.coordinates,
        zoom: 15
      })
    }
  }

  findLocation = () => {
    if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        this.showUserPosition([position.coords.latitude, position.coords.longitude])
      })
    }
  };

  render() {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      iconSize: [30, 30],
      iconAnchor: [12, 36],
      popupAnchor: [0, -25],
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    return (
      <div class="map_area">
        <Map
          center={this.state.userCoordinates}
          zoom={this.state.zoom}
          onClick={this.clickHandler}
          inertiaDeceleration={2500}
          useFlyTo={true}
          viewport={this.state.userCoordinates}
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
                        iconUrl: markers[event.technology],
                        iconSize: event.id === this.state.activeEvent.id ? [60, 60] : [30, 30],
                        iconAnchor: event.id === this.state.activeEvent.id ? [30, 30] : [15, 15]
                      }})
                    }
                    onClick={() => this.handleClickCallback(event)}
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
            <button onClick={this.findLocation}>Geolocation</button>
        </Map>

      </div>
    );
  }
}

export default MainMap;