import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import pyIcon from '../../images/tech_icons/python_icon.png'
import jsIcon from '../../images/tech_icons/js_icon.png'
import javaIcon from '../../images/tech_icons/java_icon.png'
import dbIcon from '../../images/tech_icons/database_icon.png'
import phpIcon from '../../images/tech_icons/php_icon.png'
import angularIcon from '../../images/tech_icons/angular_logo.png'
import cPlusIcon from '../../images/tech_icons/c_plus_logo.png'
import gameIcon from '../../images/tech_icons/game_dev_icon.png'
import htmlIcon from '../../images/tech_icons/html_icon.png'
import nodeIcon from '../../images/tech_icons/node_icon.png'
import rubyIcon from '../../images/tech_icons/ruby_icon.png'
import cssIcon from '../../images/tech_icons/css_icon.png'
import reactIcon from '../../images/tech_icons/react_icon.png'
import './Map.css'
import { toast } from 'react-toastify'

const markers = {
  Python: pyIcon,
  SQL: dbIcon,
  Java: javaIcon,
  PHP: phpIcon,
  JavaScript: jsIcon,
  Angular: angularIcon,
  Cplus: cPlusIcon,
  GameDev: gameIcon,
  Html: htmlIcon,
  Node: nodeIcon,
  Ruby: rubyIcon,
  CSS: cssIcon,
  React: reactIcon
};

class MainMap extends Component {

  state = {
    userMarkers: [],
    userCoordinates: [54.5, 18.5],
    activeEvent: this.props.clicked,
    zoom: 6,
    eventDateForPopup: ""
  };

  clickHandler = (e) => {
    if (this.props.newMarker) {
      this.setState({userMarkers: [[e.latlng.lat, e.latlng.lng]]});
      this.props.getCoordinates(e)
    } else {
      toast.error("Mapa jest zablokowana")
    }
  };

  handleClickCallback = data => {
    this.props.handleCallback(data);
    this.setState({
      activeEvent: this.props.clicked,
      eventDateForPopup: this.props.clicked.date,
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
        zoom: 15,
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

  countDaysToStart = () => {
    const today = new Date()
    const startDate = new Date(this.state.eventDateForPopup)
      if ((Math.floor((startDate - today) / (1000 * 60 * 60 * 24))) <= 0) {
          return 0
      } else {
          return (Math.floor((startDate - today) / (1000 * 60 * 60 * 24)))
      }
  }

  render() {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      iconSize: [30, 30],
      iconAnchor: [12, 36],
      popupAnchor: [0, -25],
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    return (
      <div className="map_area">
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
              <Popup className="pop" >
                <div>
                  <h1>{event.title}</h1>
                  <p>Technologia: {event.technology}</p>
                  <p>Ilość wolnych miejsc: {event.freeSlots}</p>
                    <p>
                      {this.countDaysToStart() === 0 ?
                      "Wydarzenie jest nieaktualne" :
                      "Do rozpoczęcia pozostało:" +  this.countDaysToStart() + " dni"}
                   </p>
                </div>
              </Popup>
            </Marker>
          )}
          {
            this.props.newMarker && this.state.userMarkers.map(
              position =>  <Marker key={position.toString()} position={position} />
            )
          }
          <div className="geo_button-container">
            <button className="geo_button" onClick={this.findLocation}></button>
          </div>
        </Map>
      </div>
    );
  }
}

export default MainMap;