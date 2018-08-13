import React, { Component } from 'react';
import './App.css';
import Map from "../Map/Map";
import L from "leaflet";

class App extends Component {

  state = {
    textValue: ''
  };

  componentDidMount() {
    const map = L.map('mapId').setView([54.35, 18.76], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([54.35, 18.64]).addTo(map)
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
