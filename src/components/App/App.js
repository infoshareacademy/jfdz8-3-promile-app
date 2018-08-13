import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class App extends Component {

  state = {
    textValue: ''
  };

  componentDidMount() {
    const map = L.map('mapId').setView([54.35, 18.76], 13);
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([54.35, 18.76]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

  }

  render() {

    return (
      <div className="App">
        <div>
          <input type="text" value={this.state.textValue}/>
        </div>
        <div className="map-container" id="mapId">
        </div>
      </div>
    );
  }
}

export default App;
